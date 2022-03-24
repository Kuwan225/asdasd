import "./scss/mode.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notif from "./Notifikasi";

const Mode = ({ setMode, mode }) => {
  const Navigate = useNavigate();
  const [checkedDark, setCheckedDark] = useState(false);
  const [checkedLight, setCheckedLight] = useState(false);
  const getMode = localStorage.getItem("mode");
  useEffect(() => {
    if (getMode === "Dark") {
      setCheckedDark(true);
    } else {
      setCheckedDark(false);
    }
    if (getMode === "Light") {
      setCheckedLight(true);
    } else {
      setCheckedLight(false);
    }
  }, []);
  const changeMode = (e) => {
    const el = e.target.value;
    localStorage.setItem("mode", el);
    setMode(false);
    Navigate("/");
    if (getMode == "Light") {
      Notif.succes(`Tema di ubah ke mode Gelap`);
    } else if (getMode == "Dark") {
      Notif.succes(`Tema di ubah ke mode Terang`);
    }
  };
  return (
    <div className="container-modes">
      <form onChange={changeMode} className="form-mode">
        <span className="back" onClick={() => setMode(false)}>
          X
        </span>
        <div>
          <input
            type="radio"
            id="dark"
            value="Dark"
            name="mode"
            checked={checkedDark}
          />
          <label htmlFor="dark">Gelap</label>
        </div>

        <div>
          <input
            type="radio"
            id="light"
            value="Light"
            name="mode"
            checked={checkedLight}
          />
          <label htmlFor="light">Terang</label>
        </div>
      </form>
    </div>
  );
};

export default Mode;
