import "./scss/title.scss";
import React from "react";

const Title = ({ label }) => {
  return (
    <div className="title">
      <h1 className="title-text">{label}</h1>
    </div>
  );
};

export default Title;
