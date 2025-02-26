import React from "react";

import { MessageEvent, MessageNotifier } from "./messageNotifier";
import "./joined.css";
import "./messages.css";

export function Messages(props) {
  const userName = props.userName;

  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    MessageNotifier.addHandler(handleChatEvent);

    return () => {
      MessageNotifier.removeHandler(handleChatEvent);
    };
  }, []);

  function handleChatEvent(event) {
    setEvent((prevEvents) => [...prevEvents, event]);
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
    <div className="players">
      <div id="player-messages">{createMessageArray()}</div>
    </div>
  );
}
