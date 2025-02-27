import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Messages } from "./messages";
import { MessageEvent, MessageNotifier } from "./messageNotifier";

import "./joined.css";

export function Joined(props) {
  const [message, setMessage] = React.useState("");
  const inputRef = React.useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleChatMessage(message) {
    MessageNotifier.broadcastEvent(props.userName, MessageEvent.Chat, {
      name: props.userName,
      message: message,
    });
    setMessage("");
    inputRef.current?.focus();
  }

  useEffect(() => {
    MessageNotifier.broadcastEvent(props.userName, MessageEvent.Join, {
      name: props.userName,
    });
  }, []);

  return (
    <main className="container-fluid bg-secondary">
      <p>Your Activity: {props.group}</p>

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
              ref={inputRef}
              type="text"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              onClick={() => handleChatMessage(message)}
              className="btn btn-primary send"
              disabled={!message}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          const activities =
            JSON.parse(localStorage.getItem("activities")) || [];

          const updatedActivities = activities.map((activity) => {
            if (activity.name === props.group) {
              return {
                ...activity,
                capacity: [activity.capacity[0] - 1, activity.capacity[1]],
              };
            }
            return activity;
          });

          localStorage.setItem("activities", JSON.stringify(updatedActivities));

          props.setGroup("");
          localStorage.removeItem("group");
          navigate("/choose");
        }}
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
