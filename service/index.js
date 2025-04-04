const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const app = express();
const DB = require("./database.js");
const { peerProxy } = require("./peerProxy.js");

const authCookieName = "token";

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// let activities = [
//   { emoji: "🍨", name: "Ice Cream", capacity: [0, 2], participants: [] },
//   { emoji: "🎷", name: "Concert", capacity: [0, 2], participants: [] },
//   { emoji: "🪨", name: "Rock Climbing", capacity: [0, 4], participants: [] },
//   { emoji: "🂡", name: "Board Games", capacity: [0, 4], participants: [] },
//   { emoji: "🎹", name: "Musical", capacity: [0, 2], participants: [] },
//   { emoji: "🏊", name: "Swimming", capacity: [0, 4], participants: [] },
//   { emoji: "🍜", name: "Dinner", capacity: [0, 2], participants: [] },
//   { emoji: "🎥", name: "Movie", capacity: [0, 6], participants: [] },
// ];
// DB.setActivities(activities);

// const chats = [
//   { name: "Ice Cream", chats: [] },
//   { name: "Concert", chats: [] },
//   { name: "Rock Climbing", chats: [] },
//   { name: "Board Games", chats: [] },
//   { name: "Musical", chats: [] },
//   { name: "Swimming", chats: [] },
//   { name: "Dinner", chats: [] },
//   { name: "Movie", chats: [] },
// ];
// DB.setChats(chats);

const port = process.argv.length > 2 ? process.argv[2] : 4000;

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post("/auth/create", async (req, res) => {
  if (await findUser("email", req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await createUser(
      req.body.name,
      req.body.email,
      req.body.password
    );

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post("/auth/login", async (req, res) => {
  const user = await findUser("email", req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth logout a user
apiRouter.delete("/auth/logout", async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

//GetActivities
apiRouter.get("/activities", verifyAuth, async (req, res) => {
  activities = await DB.getActivities();
  res.send(activities);
});

//GetGroup
apiRouter.get("/activities/group", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (!user) {
    return res.status(401).send({ msg: "Unauthorized" });
  }
  //const groupFake = userGroups[user.email];
  const group = await DB.getGroup(user.email);
  if (!group) {
    return res.send({ group: "" });
  }
  groupName = group.name;
  res.send({ group: groupName });
});

//JoinActivity
apiRouter.post("/activities/join", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (!user) {
    return res.status(401).send({ msg: "Unauthorized" });
  }

  const activityName = req.body.name;
  if (!activityName) {
    return res.status(400).send({ msg: "Activity name is required" });
  }

  //const activity = activities.find((a) => a.name === activityName);
  const activity = await DB.getActivityByGroup(activityName);
  if (!activity) {
    return res.status(404).send({ msg: "Activity not found" });
  }

  if (activity.capacity[0] >= activity.capacity[1]) {
    return res.status(400).send({ msg: "Activity is full" });
  }

  if (!activity.participants.includes(user.email)) {
    DB.joinGroup(user.email, activityName);
  }

  //userGroups[user.email] = activityName;

  res.send({ msg: `Joined ${activityName}`, group: activityName });
});

//LeaveActivity
apiRouter.post("/activities/leave", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (!user) {
    return res.status(401).send({ msg: "Unauthorized" });
  }

  const activity = await DB.getGroup(user.email);
  const activityName = activity.name;

  if (!activityName) {
    return res.status(400).send({ msg: "User is not in any group" });
  }

  if (activity) {
    activity.participants = activity.participants.filter(
      (email) => email !== user.email
    );
    DB.leaveGroup(user.email, activityName);
  }

  res.send({ msg: `Left ${activityName}` });
});

//GetJoinedActivity
apiRouter.get("/activities/:groupName", verifyAuth, async (req, res) => {
  const { groupName } = req.params;

  const activity = await DB.getActivityByGroup(groupName);
  if (!activity) {
    return res.status(404).send({ msg: "Activity not found" });
  }

  res.send({
    name: activity.name,
    capacity: activity.capacity,
  });
});

//GetChats TODO
apiRouter.get("/chats/:groupName", verifyAuth, async (req, res) => {
  const { groupName } = req.params;
  const groupChatsDB = await DB.getChat(groupName);
  res.send(groupChatsDB);
});

//UpdateChat TODO
apiRouter.post("/chat/:groupName", verifyAuth, async (req, res) => {
  const { groupName } = req.params;
  const { name, message } = req.body;
  let groupChatsDB = await DB.getChat(groupName);
  groupChatsDB.push({ name, message });
  if (groupChatsDB.length > 35) {
    groupChatsDB = groupChatsDB.slice(-35);
  }
  await DB.addChat(groupName, groupChatsDB);
  res.send(groupChatsDB);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

async function createUser(name, email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    name: name,
    email: email,
    password: passwordHash,
    token: uuid.v4(),
    group: "",
  };
  await DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === "token") {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);
