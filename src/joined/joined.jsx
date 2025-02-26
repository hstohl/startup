import React, { useEffect } from "react";

import { Messages } from "./messages";
import { MessageEvent, MessageNotifier } from "./messageNotifier";

import "./joined.css";

export function Joined(props) {
  useEffect(() => {
    MessageNotifier.broadcastEvent(props.userName, MessageEvent.Join, {
      name: props.userName,
    });
  }, []);
  return (
    <main className="container-fluid bg-secondary">
      <p>Your Activity: Board Games</p>

      <div className="card chatbox">
        <div className="card-header text-center bg-primary text-white">
          Chat with your Group
        </div>
        <div className="card-body chat-messages p-3 text-black">
          <Messages userName={props.userName} />
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
        onClick={() => (window.location.href = "choose.html")}
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
