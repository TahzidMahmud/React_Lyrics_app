import React from "react";
import spinner from "./spinner.gif";
import "../../../src/App.css";

export default () => {
  return (
    <div>
      <img className="image2" src={spinner} alt="loading...." />
    </div>
  );
};
