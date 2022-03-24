import "./scss/addTodo.scss";
import Button from "./Button";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import notif from "./Notifikasi";

const AddTodo = ({ id }) => {
  const db = getDatabase();
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("");
  const [optionSave, setOptionSave] = useState(true);
  const [disableButton, setDisableButton] = useState(true);
  const [classButton, setClassButton] = useState("disable");

  const onSubmit = () => {
    if (date.length > 0) {
      push(ref(db, `notes/${id}`), {
        todo: todo,
        date: date,
        isComplete: false,
      })
        .then((res) => {
          setTodo("");
          setDate("");
          notif.succes("Berhasil tambah todo");
        })
        .catch((err) => {
          console.log("gagal");
        });
      setOptionSave(true);
    } else {
      console.log("date kosong bang");
    }
  };
  useEffect(() => {
    if (todo.length <= 0) {
      setClassButton("disable");
      setDisableButton(true);
    } else {
      setClassButton("plus");
      setDisableButton(false);
    }
  }, [todo]);

  return (
    <>
      <div className="add-todo">
        <input
          name="todo"
          value={todo}
          className="input"
          placeholder="Tambah todo"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button
          disabled={disableButton}
          className={classButton}
          onClick={() => {
            setOptionSave(false);
          }}
        >
          +
        </button>
      </div>
      {!optionSave && (
        <div className="dates">
          <div className="add-date">
            <span onClick={() => setOptionSave(true)}>X</span>
            <input
              name="date"
              type="datetime-local"
              className="date"
              onChange={(e) => setDate(e.target.value)}
            />
            <Button label="Simpan" onClick={onSubmit} />
          </div>
        </div>
      )}
    </>
  );
};

export default AddTodo;
