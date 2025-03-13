import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Messages } from "./messages";
import { MessageEvent, MessageNotifier } from "./messageNotifier";

import "./joined.css";

export function Joined(props) {
  const [group, setGroup] = useState("");
  const [message, setMessage] = useState("");
  const [capacity, setCapacity] = useState([0, 0]);
  const [chats, setChats] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);

    const fetchUserGroup = async () => {
      try {
        const response = await fetch("/api/activities/group", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch group data");
        }

        const data = await response.json();

        setGroup(data.group);
        if (data.group) {
          fetchActivityData(data.group);
        }
      } catch (error) {
        console.error("Error fetching group:", error);
      }
    };
    fetchUserGroup();
  }, []);

  React.useEffect(() => {
    if (!group) {
      return;
    }
    const fetchChats = async () => {
      try {
        const response = await fetch(`/api/chats/${group}`, {
          credentials: "include",
        });
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [group]);

  const fetchActivityData = async (group) => {
    try {
      const response = await fetch(`/api/activities/${group}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch activity data");
      }

      const activity = await response.json();

      setCapacity(activity.capacity);
    } catch (error) {
      console.error("Error fetching activity:", error);
    }
  };

  async function handleChatMessage(message) {
    const newMessage = {
      name: props.userName,
      message: message,
    };

    MessageNotifier.broadcastEvent(
      props.userName,
      MessageEvent.Chat,
      newMessage
    );

    const groupChats = chats;
    const updatedChats = {
      ...chats,
      [group]: [...groupChats, newMessage],
    };
    //localStorage.setItem("chats", JSON.stringify(updatedChats));
    setChats(updatedChats);
    await fetch(`/api/chat/${group}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedChats),
    });

    setMessage("");
    inputRef.current?.focus();
  }

  useEffect(() => {
    MessageNotifier.broadcastEvent(props.userName, MessageEvent.Join, {
      name: props.userName,
    });
  }, [props.userName]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && message.trim()) {
      handleChatMessage(message);
    }
  };

  const handleLeaveGroup = async () => {
    if (leaveClickedRef.current) return;
    leaveClickedRef.current = true;

    if (window.confirm("Are you sure you want to leave the group?")) {
      try {
        const response = await fetch(`/api/activities/leave`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ group: group }),
        });

        if (!response.ok) {
          throw new Error("Failed to leave group");
        }
        //props.setGroup("");
        props.changeGroup("");
        navigate("/choose");
      } catch (error) {
        console.error("Error leaving group:", error);
      }
    }

    setTimeout(() => {
      leaveClickedRef.current = false;
    }, 100);
  };

  const leaveClickedRef = useRef(false);

  return (
    <main className="container-fluid bg-secondary">
      <p>
        Your Activity: {group} 👤 {capacity[0]}/{capacity[1]}
      </p>

      <div className="card chatbox">
        <div className="card-header text-center bg-primary text-white">
          Chat with your Group
        </div>
        <div className="card-body chat-messages p-3 text-black">
          <Messages userName={props.userName} group={group} />
        </div>
        <div className="card-footer">
          <div className="input-group">
            <input
              ref={inputRef}
              type="text"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
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
