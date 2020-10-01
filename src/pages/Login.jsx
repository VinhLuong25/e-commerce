import React from "react";
import Button from "../components/forms/Button";
import "./styles.scss";
import { signInWithGoogle, auth, handleUserProfile } from "../firebase/utils";
import SignUp from "./SignUp";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

export default function Login() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasAccount, setHasAccount] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const dispatch = useDispatch();

  const clearInput = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const clearErr = () => {
    setErrEmail("");
    setErrPassword("");
  };

  const handleSumitSignUp = async (e) => {
    clearErr();
    e.preventDefault();
    if (password !== confirmPassword) {
      const error = "Password does not match";
      setErrPassword(error);
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
      clearInput();
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/email-already-in-use":
          setErrEmail(error.message);
          break;
        case "auth/weak-password":
          setErrPassword(error.message);
          break;

        default:
          break;
      }
    }
  };
  const handleSubmitSignIn = async (e) => {
    clearErr();
    e.preventDefault();

    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      console.log(user.uid);
      dispatch(
        setUser({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        })
      );
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setErrEmail(error.message);
          break;
        case "auth/wrong-password":
          setErrPassword(error.message);
          break;

        default:
          break;
      }
    }
  };

  return (
    <div className="login-register">
      <h1 className="title">welcome to M.A.D</h1>
      {hasAccount ? (
        <div className="log-in">
          <h2>Log In</h2>
          <form onSubmit={handleSubmitSignIn}>
            <p>{errEmail}</p>
            <p>{errPassword}</p>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Log in</Button>
            <div className="socialLogIn">
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
          </form>
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => {
                setHasAccount(!hasAccount);
                clearErr();
              }}
            >
              SIGN UP
            </span>
          </p>
          <Link to="/recovery">Forgot password?</Link>
        </div>
      ) : (
        <div className="sign-up">
          <SignUp
            displayName={displayName}
            setDisplayName={setDisplayName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleSumitSignUp={handleSumitSignUp}
            errPassword={errPassword}
            setErrPassword={setErrPassword}
            errEmail={errEmail}
            setErrEmail={setErrEmail}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            clearErr={clearErr}
            clearInput={clearInput}
          />
        </div>
      )}
    </div>
  );
}
