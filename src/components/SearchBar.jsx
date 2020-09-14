import React, { useState, useRef } from "react";
import useOutsideClick from "../Common/useOutsideClick";

export default function SearchBar() {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  useOutsideClick(target, () => {
    if (show) setShow(false);
  });
  return (
    <div className="searchBar">
      <i className="fa fa-search" onClick={() => setShow(!show)}></i>
      {show && <input type="text" ref={target} size="70" />}
    </div>
  );
}
