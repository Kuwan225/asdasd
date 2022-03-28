import "./todolist.scss";
import jwt_decode from "jwt-decode";
import Name from "../../components/Name";
import Ongoing from "../../components/Ongoing";
import AddTodo from "../../components/AddTodo";
import notif from "../../components/Notifikasi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "../../components/MenuBar";
import { getDatabase, ref, onValue, remove, update } from "firebase/database";
import API from "../../config/api";
import classNames from "classnames";
import Jam from "../../components/jam";

const Todolist = ({ mode }) => {
  const db = getDatabase();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [payload, setPayload] = useState("");
  const token = localStorage.getItem("token");

  useEffect(async () => {
    if (!token) {
      navigate("/login");
    } else {
      const payload = jwt_decode(token);
      const result = await API.getOne(payload.id);
      if (result) {
        setPayload(result);
      }
      const endPoint = ref(db, `notes/${payload.id}`);
      onValue(endPoint, (snapshot) => {
        const data = [];
        Object.keys(snapshot.val()).map((key) => {
          data.push({
            id: key,
            data: snapshot.val()[key],
          });
        });
        setData(data);
      });
    }
  }, []);

  const deleted = (notesId) => {
    remove(ref(db, `notes/${payload.id}/${notesId}`)).then(() => {
      console.log("Berhasil hapus data");
      notif.succes("Todo berhasil di hapus");
    });
  };

  return (
    <div className={classNames("container", mode)}>
      <MenuBar home="aktif" />
      <div className="content-todolist">
        <Jam />
        <div className="todo-list">
          <Name name={payload.firstname} />
          <AddTodo id={payload.id} />
          <p className="text">On going</p>
          <div className="ongoing">
            {data.length > 0 ? (
              data.map(
                (el) =>
                  el.data.isComplete === false && (
                    <Ongoing
                      key={el.id}
                      todo={el.data.todo}
                      date={el.data.date}
                      deleted={() => deleted(el.id)}
                      userId={payload.id}
                      notesId={el.id}
                    />
                  )
              )
            ) : (
              <p className="null">Tidak ada data</p>
            )}
          </div>
          <p className="text">Complete</p>
          <div className="ongoing">
            {data.length > 0 ? (
              data.map(
                (el) =>
                  el.data.isComplete === true && (
                    <Ongoing
                      key={el.id}
                      todo={el.data.todo}
                      date={el.data.date}
                      deleted={() => deleted(el.id)}
                      userId={payload.id}
                      notesId={el.id}
                      classComplete="complete"
                      checkComplete={true}
                      isEditComplete={true}
                      classes={"disable-class"}
                    />
                  )
              )
            ) : (
              <p className="null">Tidak ada data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
