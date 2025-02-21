import React from "react";
import "./login.css";

import { Unauthenticated } from "./unauthenticated";
import { Authenticated } from "./authenticated";
import { AuthState } from "./authState";

export function Login({ fullName, userName, authState, onAuthChange }) {
  return (
    <main className="login-main container-fluid bg-secondary text-center">
      <div className="wrapper">
        {authState === AuthState.Authenticated && (
          <Authenticated
            fullName={fullName}
            userName={userName}
            onLogout={() =>
              onAuthChange(fullName, userName, AuthState.Unauthenticated)
            }
          />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            fullName={fullName}
            userName={userName}
            onLogin={(loginFullName, loginUserName) => {
              onAuthChange(
                loginFullName,
                loginUserName,
                AuthState.Authenticated
              );
            }}
          />
        )}
      </div>
    </main>
  );
}
