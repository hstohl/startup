import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Choose } from "./choose/choose";
import { Joined } from "./joined/joined";

export default function App() {
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
              <li className="nav-item">
                <NavLink className="nav-link" to="choose">
                  Join
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="joined">
                  Group
                </NavLink>
              </li>
            </menu>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/choose" element={<Choose />} />
          <Route path="/joined" element={<Joined />} />
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
