import "./nopages.scss";
import React from "react";
import { Link } from "react-router-dom";

const NoPages = () => {
  return (
    <div className="no-pages">
      <div className="text">
        <h1>Sorry, Page Not Found</h1>
        <Link to="/" className="link">
          Kembali ke halaman beranda
        </Link>
      </div>
    </div>
  );
};

export default NoPages;
