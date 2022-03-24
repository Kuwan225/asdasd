import "./scss/menuBar.scss";

import React, { useEffect, useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { RiDeleteBinLine, RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import API from "../config/api";
import notif from "./Notifikasi";
import { IoClose, IoHomeOutline } from "react-icons/io5";
import jwt_decode from "jwt-decode";
import { BiMenu } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import classNames from "classnames";
import Auth from "./Auth";

const MenuBar = ({ home, changePw, profil }) => {
  const navigate = useNavigate();
  const [hideMenus, setHideMenu] = useState(true);
  const [checkedMenu, setCheckedMenu] = useState(false);
  const token = localStorage.getItem("token");
  const [payload, setPayload] = useState("");
  const [classMenu, setClassMenu] = useState("menus");
  const [deleteAcc, setDeleteAcc] = useState(false);
  const [logouts, setLogouts] = useState(false);
  const [iconMode, setIconMode] = useState(false);
  const getMode = localStorage.getItem("mode");
  const [classAuth, setClassAuth] = useState({
    auth: "auth",
    delete: "",
    logout: "",
  });
  useEffect(async () => {
    if (token) {
      const payload = jwt_decode(token);
      const result = await API.getOne(payload.id);
      if (result) {
        setPayload(result);
      }
    }
    if (getMode === "Dark") {
      setIconMode(true);
    } else {
      setIconMode(false);
    }
  }, []);
  const hideMenu = () => {
    if (checkedMenu === false) {
      setCheckedMenu(true);
      setHideMenu(false);
      setClassMenu("menu-hide");
      setClassAuth({ auth: "auth-true", delete: "delete", logout: "logout" });
    } else {
      setHideMenu(true);
      setCheckedMenu(false);
      setClassMenu("menus");
      setClassAuth({ auth: "auth", delete: "", logout: "" });
    }
  };
  const logouted = () => {
    setLogouts(true);
    setDeleteAcc(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    notif.succes("Berhasil logout");
  };
  const deleted = () => {
    setDeleteAcc(true);
    setLogouts(false);
  };
  const deleteAkun = async () => {
    const result = API.hapusAkun(payload.id);
    if (result) {
      localStorage.removeItem("token");
      navigate("/login");
      notif.succes("Berhasil hapus akun");
    }
  };
  return (
    <div className={classMenu}>
      <div className="fixed-menu">
        {!hideMenus ? (
          <IoClose className="menu-bar x" />
        ) : (
          <BiMenu className="menu-bar" />
        )}

        <input
          type="checkbox"
          className="check-menu"
          checked={checkedMenu}
          onClick={hideMenu}
          readOnly={true}
        />
        <div className="img-profil">
          {payload.image ? (
            <img
              src={`http://localhost:3200/image/${payload.image}`}
              className="img"
            />
          ) : (
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/000/241/070/small_2x/flat-boy-with-vintage-glasses-avatar-vector-illustration.jpg"
              className="img"
            />
          )}
        </div>
        <div className="menu-akun">
          <h2>{payload.firstname}</h2>
          <p className="text-email">{payload.email}</p>
        </div>
        <hr />
        <div className="menu-box">
          <Link to="/profil" style={{ textDecoration: "none" }}>
            <div className="menu-text">
              <CgProfile className={classNames("menu-icon", profil)} />
              <p>Profil</p>
            </div>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="menu-text">
              <IoHomeOutline className={classNames("menu-icon", home)} />
              <p>Beranda</p>
            </div>
          </Link>
          <Link to="/change_password" style={{ textDecoration: "none" }}>
            <div className="menu-text">
              <RiLockPasswordLine
                className={classNames("menu-icon", changePw)}
              />
              <p>Ganti kata sandi</p>
            </div>
          </Link>
          {deleteAcc && (
            <Auth
              classs={classAuth.auth}
              text="Hapus akun?"
              onClick={deleteAkun}
              cancel={() => setDeleteAcc(false)}
              btnText="Hapus"
              style={classAuth.delete}
            />
          )}

          <div onClick={deleted} className="menu-text">
            <RiDeleteBinLine className="menu-icon" />
            <p>Hapus akun</p>
          </div>
          {logouts && (
            <Auth
              classs={classAuth}
              text="Keluar?"
              onClick={logout}
              cancel={() => setLogouts(false)}
              btnText="Keluar"
              style={classAuth.logout}
            />
          )}
          <div onClick={logouted} className={"menu-text"}>
            <CgLogOut className="menu-icon" />
            <p>Keluar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
