import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Choose } from "./choose/choose";
import { Joined } from "./joined/joined";
import { AuthState } from "./login/authState";

export default function App() {
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName") || ""
  );
  const [fullName, setFullName] = React.useState(
    localStorage.getItem("fullName") || ""
  );
  const [group, setGroup] = React.useState("");

  const currentAuthState = userName
    ? AuthState.Authenticated
    : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  React.useEffect(() => {
    const fetchUserGroup = async () => {
      if (userName) {
        try {
          const response = await fetch("/api/activities/group", {
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error("Failed to fetch group data");
          }
          const data = await response.json();
          setGroup(data.group);
        } catch (error) {
          console.error("Error fetching group data:", error);
        }
      }
    };
    console.log("First: " + group);
    fetchUserGroup();
    console.log("Second: " + group);
  }, [userName]);

  return (
    <BrowserRouter>
      <div className="app bg-dark text-light">
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-dark bg-dark">
            <div className="navbar-brand">Eventure</div>
            <menu className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="">
                  Login
                </NavLink>
              </li>
              {authState === AuthState.Authenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="choose">
                    Join
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && group && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="joined">
                    Group
                  </NavLink>
                </li>
              )}
            </menu>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Login
                fullName={fullName}
                userName={userName}
                authState={authState}
                onAuthChange={(fullName, userName, authState) => {
                  setAuthState(authState);
                  setFullName(fullName);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
          <Route
            path="/choose"
            element={
              <Choose
                fullName={fullName}
                onJoin={(group) => {
                  setGroup(group);
                }}
              />
            }
          />
          <Route
            path="/joined"
            element={
              <Joined
                userName={fullName}
                changeGroup={(group) => {
                  setGroup(group);
                }}
              />
            } // removed setGroup and group
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="bg-dark text-white-50">
          <hr />
          <span className="text-reset">Hudson Stohl</span>
          <br />
          <a href="https://github.com/hstohl/startup">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
