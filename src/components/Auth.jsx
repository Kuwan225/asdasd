import "./scss/auth.scss";
import React from "react";
import classNames from "classnames";

const Auth = ({ onClick, cancel, text, btnText, classs, style }) => {
  return (
    <div className={classNames(classs, style)}>
      <p className="auth-text">{text}</p>
      <div className="auth-button">
        <p className="btn" onClick={cancel}>
          Batal
        </p>
        <p className="btn" onClick={() => onClick()}>
          {btnText}
        </p>
      </div>
    </div>
  );
};

export default Auth;
