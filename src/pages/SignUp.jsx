import React from "react";
import Button from "../components/forms/Button";
import { Link } from "react-router-dom";

export default function SignUp(props) {
  const {
    displayName,
    setDisplayName,
    email,
    setEmail,
    setPassword,
    password,
    confirmPassword,
    setConfirmPassword,
    errPassword,
    errEmail,
    handleSumitSignUp,
    hasAccount,
    setHasAccount,
    clearErr,
    clearInput,
  } = props;
  return (
    <>
      <form onSubmit={handleSumitSignUp}>
        <h2>Sign Up</h2>

        <p>{errEmail}</p>
        <p>{errPassword}</p>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit">Sign Up</Button>
      </form>
      <p>
        Have an account?{" "}
        <span
          onClick={() => {
            setHasAccount(!hasAccount);
            clearErr();
            clearInput();
          }}
        >
          SIGN IN
        </span>
      </p>
      <Link to="/recovery">Forgot password?</Link>
    </>
  );
}
