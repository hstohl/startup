import React from "react";

import { MessageEvent, MessageNotifier, EventMessage } from "./messageNotifier";
import "./joined.css";
import "./messages.css";

export function Messages(props) {
  const userName = props.userName;
  const [events, setEvent] = React.useState([]);
  const messagesContainerRef = React.useRef(null);

  React.useEffect(() => {
    MessageNotifier.addHandler(handleChatEvent);

    return () => {
      MessageNotifier.removeHandler(handleChatEvent);
    };
  }, []);

  React.useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem("chats")) || {};
    const groupChats = storedChats[props.group] || [];
    setEvent(
      groupChats.map(
        (chat) => new EventMessage(chat.name, MessageEvent.Chat, chat)
      )
    );
  }, [props.group]);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [events]);

  function handleChatEvent(event) {
    setEvent((prevEvents) => {
      let newEvents = [...prevEvents, event];
      if (newEvents.length >= 35) {
        newEvents = newEvents.slice(1, 35);
      }

      //localStorage.setItem({props.group}, JSON.stringify(newEvents));
      return newEvents;
    });
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message = "unknown";
      if (event.type === MessageEvent.Join) {
        message = ` has joined the group`;
      } else if (event.type === MessageEvent.Leave) {
        message = ` has left the group`;
      } else if (event.type === MessageEvent.Chat) {
        message = `: ${event.value.message}`;
      } else if (event.type === MessageEvent.System) {
        message = event.value.msg;
      }

      messageArray.push(
        <div key={i} className={event.type}>
          <span className="name">{event.from}</span>
          <span>{message}</span>
        </div>
      );
    }
    return messageArray;
  }

  return (
    <div
      ref={messagesContainerRef}
      className="chat-container"
      style={{ maxHeight: "330px", overflowY: "auto" }}
    >
      {createMessageArray()}
    </div>
  );
}
