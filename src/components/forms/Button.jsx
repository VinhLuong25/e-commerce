import React from "react";
import "./style.scss";
export default function Button({ children, ...otherProps }) {
  return (
    <button className="btn" {...otherProps}>
      {children}
    </button>
  );
}
