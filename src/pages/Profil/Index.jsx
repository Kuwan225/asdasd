import "./profil.scss";
import React, { useEffect, useState } from "react";
import MenuBar from "../../components/MenuBar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import API from "../../config/api";
import decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Mode from "../../components/Mode";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Profil = () => {
  const Navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const token = localStorage.getItem("token");
  const [changeFirstname, setChangeFirstname] = useState("");
  const [changeLastname, setChangeLastname] = useState("");
  const [changeEmail, setChangeEmail] = useState("");
  const [payload, setPayload] = useState("");
  const [modeIcon, setModeIcon] = useState(false);
  const [modeOption, setModeOption] = useState(false);
  const getMode = localStorage.getItem("mode");

  const [dataImage, setDataImage] = useState("");
  const [image, setImage] = useState("");
  const [changeImage, setChangeImage] = useState(image);
  const [nullImage, setNullImage] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/000/241/070/small_2x/flat-boy-with-vintage-glasses-avatar-vector-illustration.jpg"
  );

  useEffect(async () => {
    if (token) {
      const payload = decode(token);
      setPayload(payload);
      const result = await API.getOne(payload.id);
      if (result) {
        setChangeFirstname(result.firstname);
        setChangeLastname(result.lastname);
        setChangeEmail(result.email);
        setImage(`http://localhost:3200/image/${result.image}`);
        setDataImage(result.image);
      }
    } else {
      Navigate("/login");
    }
    if (getMode === "Light") {
      setModeIcon(true);
    } else {
      setModeIcon(false);
    }
  }, []);
  const onSubmitAvatar = async () => {
    const result = await API.updateProfil(payload.id, changeImage);
    if (result) {
      console.log("Succes");
    }
  };
  const onSubmit = async (data) => {
    const result = await API.updateData(data, payload.id);
    if (result) {
      Navigate("/");
    }
  };

  const changeImageHandler = (e) => {
    const url = e.target.files[0];
    setImage(URL.createObjectURL(url));
    setNullImage(URL.createObjectURL(url));
    setChangeImage(url);
  };

  const modeHandler = () => {
    setModeOption(true);
  };
  return (
    <div className="container-profil">
      <MenuBar profil="aktif" />
      <div className="content-profil">
        <div className="content">
          <div className="mode" onClick={modeHandler}>
            {!modeIcon ? (
              <MdOutlineDarkMode className="icon" />
            ) : (
              <MdOutlineLightMode className="icon" />
            )}

            <p>Tema</p>
          </div>
          {modeOption && <Mode setMode={setModeOption} />}
          <div className="content-img">
            {dataImage ? (
              <img src={image} className="img" />
            ) : (
              <img src={nullImage} className="img" />
            )}
            <div className="changeOptionImg">
              <div className="changeImg">
                <p>Ubah gambar</p>
                <input type="file" onChange={changeImageHandler} />
              </div>
              <button onClick={onSubmitAvatar}>Simpan</button>
            </div>
          </div>
          <hr />
          <div className="content-form">
            <div className="input-name">
              <div className="firstname">
                <label htmlFor="lastname">Firstname:</label>
                <Input
                  profil="profil"
                  place="Firstname"
                  value={changeFirstname}
                  name="firstname"
                  register={register("firstname", {
                    required: true,
                    onChange: (e) => setChangeFirstname(e.target.value),
                  })}
                />
              </div>
              <div className="lastname">
                <label htmlFor="lastname">lastname:</label>
                <Input
                  profil="profil"
                  place="Lastname"
                  value={changeLastname}
                  name="lastname"
                  register={register("lastname", {
                    required: true,
                    onChange: (e) => setChangeLastname(e.target.value),
                  })}
                />
              </div>
            </div>
            <label htmlFor="lastname">Email:</label>
            <Input
              profil="profil"
              place="Email"
              value={changeEmail}
              name="email"
              register={register("email", {
                required: true,
                onChange: (e) => setChangeEmail(e.target.value),
              })}
            />
            <div className="button">
              <Button label="Simpan" onClick={handleSubmit(onSubmit)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
