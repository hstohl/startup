import React, { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Messages } from "./messages";
import { MessageEvent, MessageNotifier } from "./messageNotifier";

import "./joined.css";

export function Joined(props) {
  const [message, setMessage] = React.useState("");
  const [capacity, setCapacity] = React.useState([0, 0]);
  const inputRef = React.useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    const activity = JSON.parse(localStorage.getItem("activities")).find(
      (activity) => activity.name === props.group
    );
    if (activity) {
      setCapacity(activity.capacity);
    }
  }, [props.group]);

  function handleChatMessage(message) {
    const newMessage = {
      name: props.userName,
      message: message,
    };

    MessageNotifier.broadcastEvent(
      props.userName,
      MessageEvent.Chat,
      newMessage
    );

    const chats = JSON.parse(localStorage.getItem("chats")) || {};
    const groupChats = chats[props.group] || [];
    const updatedChats = {
      ...chats,
      [props.group]: [...groupChats, newMessage],
    };
    localStorage.setItem("chats", JSON.stringify(updatedChats));

    setMessage("");
    inputRef.current?.focus();
  }

  useEffect(() => {
    MessageNotifier.broadcastEvent(props.userName, MessageEvent.Join, {
      name: props.userName,
    });
  }, []);

  const handleLeaveGroup = () => {
    if (leaveClickedRef.current) return;
    leaveClickedRef.current = true;

    if (window.confirm("Are you sure you want to leave the group?")) {
      const activities = JSON.parse(localStorage.getItem("activities")) || [];

      // console.log("Before update:", activities[5]);

      const updatedActivities = activities.map((activity) => {
        if (activity.name === props.group) {
          return {
            ...activity,
            capacity: [activity.capacity[0] - 1, activity.capacity[1]],
          };
        }
        return activity;
      });

      // console.log("After update:", updatedActivities[5]);

      localStorage.setItem("activities", JSON.stringify(updatedActivities));

      // console.log(
      //   "After setItem:",
      //   JSON.parse(localStorage.getItem("activities"))
      // );

      props.setGroup("");
      localStorage.removeItem("group");
      navigate("/choose");
    } else {
      //navigate("/joined");
    }

    setTimeout(() => {
      leaveClickedRef.current = false;
    }, 100);
  };

  const leaveClickedRef = useRef(false);

  return (
    <main className="container-fluid bg-secondary">
      <p>
        Your Activity: {props.group} 👤 {capacity[0]}/{capacity[1]}
      </p>

      <div className="card chatbox">
        <div className="card-header text-center bg-primary text-white">
          Chat with your Group
        </div>
        <div className="card-body chat-messages p-3 text-black">
          <Messages userName={props.userName} group={props.group} />
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
        onClick={handleLeaveGroup}
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
