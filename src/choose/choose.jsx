import React from "react";
import { useNavigate } from "react-router-dom";
import "./choose.css";

export function Choose(props) {
  const navigate = useNavigate();

  return (
    <main className="container-fluid bg-secondary text-center">
      <h1>Join an Activity!</h1>
      <div>
        <span>User: Hudson Stohl </span>
        <button
          type="join"
          onClick={() => navigate("/")}
          className="btn btn-outline-light btn-sm"
        >
          {" "}
          Sign Out
        </button>
      </div>
      <br />
      <br />

      <div className="container">
        <div className="card">
          <div className="activity">
            <div>🍨</div>
            <div>Ice Cream</div>
            <div>👤 1/2</div>
            <button
              onClick={() => {
                props.onGroupChoice("Ice Cream");
                navigate("/joined");
              }}
              type="button"
              className="btn btn-primary"
              //disabled
            >
              Join
            </button>
          </div>
        </div>
        <div className="card">
          <div className="activity">
            <div>🎷</div>
            <div>Concert</div>
            <div>👤 1/2</div>
            <button type="button" className="btn btn-primary">
              Join
            </button>
          </div>
        </div>
        <div className="card">
          <div className="activity">
            <div>🪨</div>
            <div>Rock Climbing</div>
            <div>👤 0/4</div>
            <button type="button" className="btn btn-primary">
              Join
            </button>
          </div>
        </div>
        <div className="card">
          <div className="activity">
            <div>🂡</div>
            <div>Board Games</div>
            <div>👤 4/4</div>
            <button type="button" className="btn btn-primary" disabled>
              Full
            </button>
          </div>
        </div>
        <div className="card">
          <div className="activity">
            <div>🎹</div>
            <div>Musical</div>
            <div>👤 1/2</div>
            <button type="button" className="btn btn-primary">
              Join
            </button>
          </div>
        </div>
        <div className="card">
          <div className="activity">
            <div>🏊</div>
            <div>Swimming</div>
            <div>👤 3/4</div>
            <button type="button" className="btn btn-primary">
              Join
            </button>
          </div>
        </div>
        <div className="card">
          <div className="activity">
            <div>🍜</div>
            <div>Dinner</div>
            <div>👤 2/2</div>
            <button type="button" className="btn btn-primary" disabled>
              Full
            </button>
          </div>
        </div>
        <div className="card">
          <div className="activity">
            <div>🎥</div>
            <div>Movie</div>
            <div>👤 4/6</div>
            <button type="button" className="btn btn-primary">
              Join
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
