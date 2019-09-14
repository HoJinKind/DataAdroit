import React from "react";
import load from "../images/load.gif";

function ShowDetail() {
  return (
    <div className="loader center">
      { <img src={load} /> }
    </div>
  );
}

export default ShowDetail;
