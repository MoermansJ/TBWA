import React from "react";
import "./BatteryWarning.css";

function BatteryWarning({ extremeTempList }) {
  return (
    <div className="tooltip">
      {/* <span className={`hidden${extremeTempList ? "-tooltiptext" : ""}`}>
        Extreme temperatures predicted!{" "}
        {extremeTempList ? extremeTempList : "test"}
      </span> */}
      <img
        src={"https://www.svgrepo.com/show/361848/warning.svg"}
        alt="battery warning"
        className={`battery${extremeTempList ? "-warning" : ""}`}
      />
    </div>
  );
}

export default BatteryWarning;
