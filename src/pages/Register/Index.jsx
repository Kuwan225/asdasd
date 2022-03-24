import "./signup.scss";
import API from "../../config/api";
import { useForm } from "react-hook-form";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Button from "../../components/Button";
import notif from "../../components/Notifikasi";
import TitleNav from "../../components/TitleNav";
import React, { useState, useEffect } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Mata from "../../components/Mata";

const Register = () => {
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [eyePassword, setEyePassword] = useState("password");
  const [eyeConPassword, setEyeConPassword] = useState("password");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (token) {
      Navigate("/");
    }
  }, []);

  const onSubmit = async (data) => {
    if (data.password == confirmPassword) {
      const result = await API.register(data);
      if (result) {
        Navigate("/login");
      }
    } else {
      console.log("password tidak sama");
      notif.error("password tidak sama");
    }
  };
  return (
    <div className="container-signup">
      <Title label="Sign up" />
      <Link to="/login" style={{ textDecoration: "none" }}>
        <TitleNav label="login?" />
      </Link>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-name">
          <div className="firstname">
            <Input
              name="firstname"
              type="text"
              place="Firstname"
              register={register("firstname", {
                required: true,
                pattern: /[A-Z]/,
              })}
            />
            {errors.firstname && errors.firstname.type === "required" && (
              <p className="validateError">
                <RiErrorWarningLine /> Firstname Tidak boleh kosong
              </p>
            )}
            {errors.firstname && errors.firstname.type === "pattern" && (
              <p className="validateError">
                <RiErrorWarningLine />
                Harus di awali hurup besar
              </p>
            )}
          </div>

          <div className="lastname">
            <Input
              name="lastname"
              type="text"
              place="Lastname "
              register={register("lastname", {
                required: true,
              })}
            />
            {errors.lastname && (
              <p className="validateError">
                <RiErrorWarningLine />
                Lastname Tidak boleh kosong
              </p>
            )}
          </div>
        </div>
        <Input
          name="email"
          type="email"
          place="Email name"
          register={register("email", {
            required: true,
            pattern: /[A-Za]/,
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <p className="validateError">
            <RiErrorWarningLine />
            Email Tidak boleh kosong
          </p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p className="validateError">
            <RiErrorWarningLine />
            Email tidak valid
          </p>
        )}
        <div className="register-mata">
          <Input
            name="password"
            type={eyePassword}
            place="Password name"
            register={register("password", {
              required: true,
              minLength: 8,
            })}
          />
          <Mata setType={setEyePassword} />
        </div>

        {errors.password && errors.password.type === "required" && (
          <p className="validateError">
            <RiErrorWarningLine />
            Password Tidak boleh kosong
          </p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p className="validateError">
            <RiErrorWarningLine />
            Password harus lebih 8 karakter
          </p>
        )}
        <div className="register-mata">
          <Input
            name="conPassword"
            type={eyeConPassword}
            place="Confirm password"
            register={register("conPassword", {
              required: true,
              onChange: (e) => setConfirmPassword(e.target.value),
            })}
          />
          <Mata setType={setEyeConPassword} />
        </div>

        <Button label="Sign up" />
      </form>
    </div>
  );
};

export default Register;
