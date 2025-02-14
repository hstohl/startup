import React from "react";
import "./joined.css";

export function Joined() {
  return (
    <main className="container-fluid bg-secondary">
      <p>Your Activity: Board Games</p>

      <div className="card chatbox">
        <div className="card-header text-center bg-primary text-white">
          Chat with your Group
        </div>
        <div className="card-body chat-messages p-3 text-black">
          <div className="mb-2 text-info">
            <strong>Hudson Stohl</strong> has joined the group
          </div>
          <div className="mb-2 text-info">
            <strong>Connor Murphy</strong> has left the group
          </div>
          <div className="mb-2 text-info">
            <strong>Emma Clark</strong> has joined the group
          </div>
          <div className="mb-2 text-info">
            <strong>Brandon Clark</strong> has joined the group
          </div>
          <div className="mb-2">
            <strong>Emma:</strong> Hello!
          </div>
          <div className="mb-2">
            <strong>Hudson:</strong> What's up
          </div>
          <div className="mb-2">
            <strong>Brandon:</strong> Yo
          </div>
          <div className="mb-2 text-info">
            <strong>Kramer Horning</strong> has joined the group
          </div>
          <div className="mb-2">
            <strong>Kramer:</strong> Yall ready to play some Catan?
          </div>
          <div className="mb-2">
            <strong>Hudson:</strong> Sounds good to me, when you thinking?
          </div>
          <div className="mb-2">
            <strong>Brandon:</strong> Friday night?
          </div>
          <div className="mb-2">
            <strong>Kramer:</strong> I've got to go to a birthday party
          </div>
          <div className="mb-2">
            <strong>Brandon:</strong> bruh
          </div>
          <div className="mb-2">
            <strong>Brandon:</strong> Saturday at 8?
          </div>
          <div className="mb-2">
            <strong>Kramer:</strong> Works for me
          </div>
          <div className="mb-2">
            <strong>Hudson:</strong> Me too
          </div>
          <div className="mb-2">
            <strong>Emma:</strong> I'm good with that
          </div>
          <div className="mb-2">
            <strong>Brandon:</strong> Lit see yall then
          </div>
        </div>
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type a message..."
            />
            <button className="btn btn-primary send">Send</button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onclick="window.location.href = 'choose.html';"
        className="btn btn-danger btn-fixed"
      >
        Leave Group
      </button>
      <br />
      <br />
      <img className="image" src="OceanHands.png" alt="Ocean Hands" />
    </main>
  );
}
