import React from "react";
import Button from "../components/forms/Button";
import { useState } from "react";
import { auth } from "../firebase/utils";
import { useHistory } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth
        .sendPasswordResetEmail(email)
        .then(() => history.push("/login"));
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-not-found":
          setErr(error.message);
          break;

        default:
          break;
      }
    }
  };
  return (
    <div className="reset-password">
      <h2>Reset Password</h2>
      <p>{err}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <Button type="submit">Email Password</Button>
      </form>
    </div>
  );
}
