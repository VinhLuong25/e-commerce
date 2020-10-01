import React from "react";
import "./title.scss";
export default function Title(props) {
  return (
    <div className="title">
      <div className="bold"></div>
      <p className="text">{props.children}</p>
    </div>
  );
}
