import React, { useEffect, useState } from "react";
import "./change_password.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import API from "../../config/api";
import { useNavigate } from "react-router-dom";
import { RiErrorWarningLine } from "react-icons/ri";
import MenuBar from "../../components/MenuBar";
import Mata from "../../components/Mata";

const Change_password = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [payload, setPayload] = useState("");
  const [typeOld, setTypeOld] = useState("password");
  const [typeNew, setTypeNew] = useState("password");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await API.changePw(data, payload.id);
    if (result) navigate("/");
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const payload = jwt_decode(token);
      setPayload(payload);
    }
  }, []);
  return (
    <div className="container-change">
      <MenuBar changePw="aktif" />
      <div className="content">
        <div className="change-password">
          <h1>Ganti kata sandi</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="password-last">
              <p className="text-label">Masukan kata sandi lama:</p>
              <div className="change-eye">
                <Input
                  name="lastPassword"
                  type={typeOld}
                  place="Kata sandi lama"
                  register={register("lastPassword", {
                    required: true,
                  })}
                />
                <Mata setType={setTypeOld} />
              </div>

              {errors.lastPassword && (
                <p className="validateError">
                  <RiErrorWarningLine />
                  Kata sandi lama wajib di isi
                </p>
              )}
            </div>
            <div className="password-new">
              <p className="text-label">Masukan kata sandi baru:</p>
              <div className="change-eye">
                <Input
                  name="newPassword"
                  type={typeNew}
                  place="Kata sandi baru"
                  register={register("newPassword", {
                    required: true,
                  })}
                />
                <Mata setType={setTypeNew} />
              </div>

              {errors.newPassword && (
                <p className="validateError">
                  <RiErrorWarningLine />
                  Kata sandi bar tidak boleh kosong
                </p>
              )}
              <Button label="Simpan" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Change_password;
