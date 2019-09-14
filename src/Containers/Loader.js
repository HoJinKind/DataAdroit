import React from "react";
import load from "../images/load.gif";

function ShowDetail() {
  return (
    <div className="loader center">
      {/* <img src={load} /> */}
      <i className="fa fa-cog fa-spin" />
    </div>
  );
}

export default ShowDetail;
