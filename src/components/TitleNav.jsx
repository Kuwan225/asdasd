import "./scss/titleNav.scss";
import React from "react";

const TitleNav = ({ label }) => {
  return (
    <div className="title-smools">
      <p className="text">{label}</p>
    </div>
  );
};

export default TitleNav;
