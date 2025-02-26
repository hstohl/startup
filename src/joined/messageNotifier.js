const MessageEvent = {
  System: "system",
  Chat: "chat",
  Join: "chatJoin",
  Leave: "chatLeave",
  End: "gameEnd",
  Start: "gameStart",
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class MessageEventNotifier {
  events = [];
  handlers = [];

  constructor() {
    // Simulate chat messages that will eventually come over WebSocket
    setInterval(() => {
      var nameOptions = [
        "Brandon Clark",
        "Emma Clark",
        "Hudson Stohl",
        "Kramer Horning",
      ];
      var messageOptions = [
        "Hello!",
        "What's up",
        "Yo",
        "Yall ready to play some Catan?",
        "I've got to go to a birthday party",
        "bruh",
        "Saturday at 8?",
        "Works for me",
        "Me too",
        "I'm good with that",
        "Lit see yall then",
      ];
      const message =
        messageOptions[Math.floor(Math.random() * messageOptions.length)];
      const userName =
        nameOptions[Math.floor(Math.random() * nameOptions.length)];
      this.broadcastEvent(userName, MessageEvent.Chat, {
        name: userName,
        message: message,
      });
    }, 7000);
    // setInterval(() => {
    //   var nameOptions = [
    //     "Brandon Clark",
    //     "Emma Clark",
    //     "Hudson Stohl",
    //     "Kramer Horning",
    //   ];
    //   const userName =
    //     nameOptions[Math.floor(Math.random() * nameOptions.length)];
    //   var messageTypeOptions = [MessageEvent.Join, MessageEvent.Leave];
    //   const messageType =
    //     messageTypeOptions[
    //       Math.floor(Math.random() * messageTypeOptions.length)
    //     ];
    //   this.broadcastEvent(userName, messageType, {
    //     name: userName,
    //   });
    // }, 19769);
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    this.receiveEvent(event);
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);

    this.handlers.forEach((handler) => {
      handler(event);
    });
  }
}

const MessageNotifier = new MessageEventNotifier();
export { MessageEvent, MessageNotifier };
