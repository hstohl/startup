import React from "react";
// import "./login.css";

export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div className="header-container">
        <h1>Welcome to Eventure</h1>
        <p>Sign in or register to get started!</p>
      </div>
      <form method="get" action="choose">
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
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <button type="submit" className="btn btn-outline-light">
            Register
          </button>
        </div>
      </form>
    </main>
  );
}
