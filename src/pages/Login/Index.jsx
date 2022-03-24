import "./login.scss";
import API from "../../config/api";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Button from "../../components/Button";
import TitleNav from "../../components/TitleNav";
import { RiErrorWarningLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Mata from "../../components/Mata";

const Login = ({ loading }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [type, setType] = useState("password");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  const onSubmit = async (data) => {
    const result = await API.login(data);
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="container-login">
      <Title label="Login" />
      <Link to="/register" style={{ textDecoration: "none" }}>
        <TitleNav label="sign up?" />
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          type="email"
          place="Your email"
          register={register("email", {
            required: true,
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
        <div className="login-mata">
          <Input
            name="password"
            type={type}
            place="Your password"
            register={register("password", {
              required: true,
            })}
          />
          <Mata setType={setType} />
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
        <Button label="Login" />
      </form>
    </div>
  );
};

export default Login;
