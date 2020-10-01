import React from "react";

export default function FormField({ type, name, placeholder, required }) {
  return (
    <div className="form-field">
      <input name={name} type={type} placeholder={placeholder} required />
    </div>
  );
}
