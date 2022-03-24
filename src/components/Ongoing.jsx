import "moment/locale/id";
import moment from "moment";
import "./scss/ongoing.scss";
import React, { useState, useRef, useEffect } from "react";
import { getDatabase, ref, update } from "firebase/database";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import notif from "./Notifikasi";
import classNames from "classnames";

const Ongoing = (props) => {
  const db = getDatabase();
  const {
    todo,
    date,
    deleted,
    userId,
    notesId,
    classComplete,
    checkComplete,
    modes,
    isEditComplete,
    classes,
  } = props;
  const [check, setCheck] = useState(checkComplete || false);
  const [todoEdit, setTodoEdit] = useState(todo);
  const [todoDate, setTodoDate] = useState(date);
  const [buttonEdit, setButtonEdit] = useState(false);
  const [inputEdit, setInputEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef("");

  const dated = moment(todoDate).format("LLLL");
  const checked = () => {
    if (check === false) {
      update(ref(db, `notes/${userId}/${notesId}`), {
        isComplete: true,
      }).then(() => {
        notif.succes("Berhasil menyelesaikan todo");
      });
      setCheck(true);
    } else {
      setCheck(false);
      update(ref(db, `notes/${userId}/${notesId}`), {
        isComplete: false,
      }).then(() => {
        notif.succes("Todo berhasil di undo");
      });
    }
  };
  const editTodo = () => {
    if (todoEdit.length > 0) {
      update(ref(db, `notes/${userId}/${notesId}`), {
        todo: todoEdit,
        date: todoDate,
      }).then(() => {
        notif.succes("Todo berhasil di edit");
        setIsEditing(false);
        setButtonEdit(false);
        setInputEdit(false);
      });
    } else {
      notif.error("todo tidak boleh kosong");
    }
  };
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  return (
    <div className={classNames("on-going", modes)}>
      <div className="left">
        {!inputEdit ? (
          <>
            <div className="check-list">
              <input
                type="checkbox"
                checked={check}
                onClick={checked}
                readOnly={true}
              />
              <span className="checkmark"></span>
            </div>

            <div className="value">
              <p className={classNames("todo", classComplete)}>{todo}</p>
              <hr className="hr" />
              <p className="dated">{dated}</p>
            </div>
          </>
        ) : (
          <div className="inputEdits">
            <input
              ref={inputRef}
              value={todoEdit}
              type="text"
              className="inputEdit"
              onChange={(e) => setTodoEdit(e.target.value)}
            />
            <div className="dated">
              <input
                type="datetime-local"
                className="dateEdit"
                onChange={(e) => setTodoDate(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      <div className="right">
        {!buttonEdit ? (
          <div className="buttonEdit">
            <p className="delete" onClick={deleted}>
              <AiOutlineDelete />
            </p>
            <button
              disabled={isEditComplete || false}
              className={classNames("edit", classes)}
              onClick={() => {
                setIsEditing(true);
                setInputEdit(true);
                setButtonEdit(true);
              }}
            >
              <AiOutlineEdit />
            </button>
          </div>
        ) : (
          <div className="conEdit">
            <p
              className="cancel"
              onClick={() => {
                setButtonEdit(false);
                setInputEdit(false);
                setTodoEdit(todo);
                setIsEditing(false);
              }}
            >
              Batal
            </p>
            <p className="save" onClick={editTodo}>
              Simpan
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ongoing;
