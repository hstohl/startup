import React from "react";

import Button from "react-bootstrap/Button";
import { MessageDialog } from "./messageDialog";
import "./login.css";

export function Unauthenticated(props) {
  const [fullName, setFullName] = React.useState(props.fullName);
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    if (!userName.includes("@") || !userName.includes(".")) {
      // this will be a third-party call to an email verifier
      setDisplayError("Invalid email address.");
      return;
    }
    if (localStorage.getItem(userName)) {
      setDisplayError("User already exists.");
      return;
    }
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: "post",
      body: JSON.stringify({
        name: fullName,
        email: userName,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response?.status === 200) {
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("userName", userName);
      props.onLogin(fullName, userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
      <main className="login-main container-fluid bg-secondary text-center">
        <div className="header-container">
          <h1>Welcome to Eventure</h1>
          <p>Sign in or register to get started!</p>
        </div>
        <div className="forms-container">
          <div className="form-group">
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              id="fullname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          <div className="form-group">
            <Button
              variant="btn btn-primary"
              onClick={() => loginUser()}
              disabled={!fullName || !userName || !password}
            >
              Login
            </Button>
            <Button
              variant="btn btn-outline-light"
              onClick={() => createUser()}
              disabled={!fullName || !userName || !password}
            >
              Register
            </Button>
          </div>
        </div>
      </main>

      <MessageDialog
        message={displayError}
        onHide={() => setDisplayError(null)}
      />
    </>
  );
}
