import "./scss/name.scss";
import React, { useEffect } from "react";

const Name = ({ name }) => {
  useEffect(() => {
    const jam = new Date().getHours();
    if (jam <= 12 && jam >= 3) {
      localStorage.setItem("jam", "Selamat Pagi");
    } else if (jam <= 17 && jam > 12) {
      localStorage.setItem("jam", "Selamat Sore");
    } else if (jam <= 3 || jam >= 18) {
      localStorage.setItem("jam", "Selamat Malam");
    }
  }, []);
  const warning = localStorage.getItem("jam");
  return (
    <div>
      <h1 className="name">
        {warning}, {name}
      </h1>
    </div>
  );
};

export default Name;
