import React from "react";

export default function FormField({
  type,
  name,
  placeholder,
  required,
  classname,
}) {
  return (
    <div className="form-field">
      {classname ? (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required
          className="shortBox"
        />
      ) : (
        <input name={name} type={type} placeholder={placeholder} required />
      )}
    </div>
  );
}
