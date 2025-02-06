import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

export default function App() {
  return (
    <div className="bg-dark text-light">
      <header className="container-fluid">
        <nav className="navbar fixed-top navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            Eventure
          </a>
          <menu className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="index.html">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="choose.html">
                Join
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="joined.html">
                Group
              </a>
            </li>
          </menu>
        </nav>
      </header>

      <main>Main stuff here!</main>

      <footer className="bg-dark text-white-50">
        <hr />
        <span className="text-reset">Hudson Stohl</span>
        <br />
        <a href="https://github.com/hstohl/startup">GitHub</a>
      </footer>
    </div>
  );
}
