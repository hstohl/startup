const { WebSocketServer } = require("ws");
const DB = require("./database.js");

function peerProxy(httpServer) {
  // Create a websocket object
  const socketServer = new WebSocketServer({ server: httpServer });

  const groupMembers = new Map();

  socketServer.on("connection", (socket) => {
    console.log("Websocket connection established");
    socket.isAlive = true;

    // Forward messages to everyone except the sender
    socket.on("message", async function message(data) {
      const message = JSON.parse(data);
      const { type, from, value, email } = message;
      // console.log("Who it's from (peerProxy): ", from);
      // console.log("Who it's actually from (peerProxy): ", email);
      // console.log("Message type (peerProxy): ", type);

      if (type === "chatJoin") {
        const userGroup = await getUserGroup(email);
        groupMembers.set(socket, userGroup);
        // sendCapacityUpdate(userGroup, 0);
      }

      const senderGroup = groupMembers.get(socket);
      if (!senderGroup) return;

      if (type === "chatLeave") {
        const groupName = groupMembers.get(socket);
        groupMembers.delete(socket);
        // sendCapacityUpdate(groupName, -1);
      }

      socketServer.clients.forEach((client) => {
        if (
          client.readyState === WebSocket.OPEN &&
          groupMembers.get(client) === senderGroup
        ) {
          client.send(data);
        }
      });
    });

    socket.on("close", () => {
      groupMembers.delete(socket);
    });

    // Respond to pong messages by marking the connection alive
    socket.on("pong", () => {
      socket.isAlive = true;
    });
  });

  // Periodically send out a ping message to make sure clients are alive
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);

  async function getUserGroup(email) {
    const group = await DB.getGroup(email);
    return group ? group.name : null;
  }

  // async function sendCapacityUpdate(userGroup, change) {
  //   const activity = await DB.getActivityByGroup(userGroup);
  //   const updatedCapacity = activity ? activity.capacity : [0, 0];
  //   updatedCapacity[0] += change || 0;
  //   console.log("Updated capacity: ", updatedCapacity);

  //   const capacityUpdateMessage = JSON.stringify({
  //     type: "CapacityUpdate",
  //     from: "System",
  //     value: { group: userGroup, capacity: updatedCapacity },
  //   });

  //   socketServer.clients.forEach((client) => {
  //     if (
  //       client.readyState === WebSocket.OPEN &&
  //       groupMembers.get(client) === userGroup
  //     ) {
  //       console.log(
  //         "Sending capacity update to client: ",
  //         capacityUpdateMessage
  //       );
  //       client.send(capacityUpdateMessage);
  //     }
  //   });
  // }
}

module.exports = { peerProxy };
