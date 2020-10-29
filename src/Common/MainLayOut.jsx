import React from "react";

export default function MainLayOut({ children, title }) {
  return (
    <div className="main-layout">
      <h1>{title}</h1>
      {children}
    </div>
  );
}
