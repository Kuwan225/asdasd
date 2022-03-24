import "./scss/mata.scss";
import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Mata = ({ setType }) => {
  const [eye, setEye] = useState(false);
  return (
    <div className="eye">
      {eye ? (
        <IoEye
          className="hide"
          onClick={() => {
            setEye(false);
            setType("password");
          }}
        />
      ) : (
        <IoEyeOff
          className="no-hide"
          onClick={() => {
            setEye(true);
            setType("text");
          }}
        />
      )}
    </div>
  );
};

export default Mata;
