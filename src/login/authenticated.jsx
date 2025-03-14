import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

import "./authenticated.css";

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: "delete",
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem("fullName");
        localStorage.removeItem("userName");
        props.onLogout();
      });
  }

  return (
    <div>
      <h1>Welcome to Eventure</h1>
      <div className="myName">{props.fullName}</div>
      <Button variant="primary" onClick={() => navigate("/choose")}>
        Join a Group
      </Button>
      <Button variant="secondary" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
