import React from "react";

import Button from "react-bootstrap/Button";
import { MessageDialog } from "./messageDialog";

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem("userName", userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem("userName", userName);
    props.onLogin(userName);
  }

  return (
    <>
      <main className="login-main container-fluid bg-secondary text-center">
        <div className="header-container">
          <h1>Welcome to Eventure</h1>
          <p>Sign in or register to get started!</p>
        </div>
        <div className="form-group">
          <label htmlFor="fullname">Full Name:</label>
          <input type="text" id="fullname" placeholder="your name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" placeholder="your@email.com" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="password" />
        </div>
        <div className="form-group">
          <Button
            className="btn btn-primary"
            onClick={() => loginUser()}
            disabled={!userName || !password}
          >
            Login
          </Button>
          <Button
            className="btn btn-outline-light"
            onClick={() => createUser()}
            disabled={!userName || !password}
          >
            Register
          </Button>
        </div>
      </main>

      <MessageDialog
        message={displayError}
        onHide={() => setDisplayError(null)}
      />
    </>
  );
}
