const MessageEvent = {
  System: "system",
  Chat: "chat",
  Join: "chatJoin",
  Leave: "chatLeave",
  End: "gameEnd",
  Start: "gameStart",
  CapacityUpdate: "capacityUpdate",
};

class EventMessage {
  constructor(from, type, value, email) {
    this.from = from;
    this.type = type;
    this.value = value;
    this.email = email;
  }
}

class MessageEventNotifier {
  events = [];
  handlers = [];

  constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    this.socket = new WebSocket(
      `${protocol}://${window.location.hostname}:${port}/ws`
    );
    this.socket.onopen = (event) => {
      this.receiveEvent(
        new EventMessage("Eventure", MessageEvent.System, { msg: "connected" })
      );
    };
    this.socket.onclose = (event) => {
      this.receiveEvent(
        new EventMessage("Eventure", MessageEvent.System, {
          msg: "disconnected",
        })
      );
    };
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch {}
    };
  }

  broadcastEvent(from, type, value, email) {
    const event = new EventMessage(from, type, value, email);
    this.socket.send(JSON.stringify(event));
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    /* this.handlers = */ this.handlers.filter((h) => h !== handler); // added 'this.handlers = '
  }

  receiveEvent(event) {
    this.events.push(event);

    this.handlers.forEach((handler) => {
      handler(event);
    });
  }
}

const MessageNotifier = new MessageEventNotifier();
export { MessageEvent, MessageNotifier, EventMessage };
