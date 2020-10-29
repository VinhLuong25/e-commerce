import React from "react";

export default function SavedPaymentEdit({ closePopUp }) {
  return (
    <div>
      <div className="popup-inner">
        <p>Saved</p>
        <div onClick={() => closePopUp()}>x</div>
      </div>
    </div>
  );
}
