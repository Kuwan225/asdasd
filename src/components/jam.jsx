import React from "react";
import "./scss/jam.scss";
import moment from "moment";

const Jam = () => {
  const jam = new Date().getHours();
  const menit = new Date().getMinutes();
  const dated = moment().format("LL");

  return (
    <div className="jams">
      <div className="jam">
        {jam}:{menit}
      </div>
      <div className="dated">{dated}</div>
      <hr />
    </div>
  );
};

export default Jam;
