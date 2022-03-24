import "./scss/input.scss";
import React from "react";
import classNames from "classnames";

const Input = ({ type, place, name, register, value, profil }) => {
  return (
    <div>
      <input
        value={value}
        {...register}
        name={name}
        type={type || "text"}
        className={classNames("input", profil)}
        placeholder={place || "Input"}
      />
    </div>
  );
};

export default Input;
