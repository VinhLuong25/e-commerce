import React from "react";
import { useState } from "react";

export default function InfoBox(props) {
  const { infoTitle, info } = props;
  const [show, setShow] = useState(false);
  return (
    <div className="boxes">
      <div onClick={() => setShow(!show)} className="boxes-content">
        <p>{infoTitle}</p>
        {show ? (
          <i className="fa fa-minus"></i>
        ) : (
          <i className="fa fa-plus"></i>
        )}
      </div>
      {show && <div>{info}</div>}
    </div>
  );
}
