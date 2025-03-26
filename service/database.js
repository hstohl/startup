const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db("startup");
const userCollection = db.collection("user");
const activityCollection = db.collection("activities");
const groupCollection = db.collection("group");
const chatCollection = db.collection("chat");

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(
      `Unable to connect to database with ${url} because ${ex.message}`
    );
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function getActivities() {
  return activityCollection.find().toArray();
}

async function getActivityByGroup(group) {
  return await activityCollection.findOne({ name: group });
}

async function setActivities(activities) {
  activityCollection.deleteMany({});
  await activityCollection.insertMany(activities);
}

async function getGroup(user) {
  //thisUser = userCollection.findOne({ email: user });
  return await activityCollection.findOne({ participants: user });
}

async function joinGroup(user, group) {
  await activityCollection.updateOne(
    { name: group },
    { $push: { participants: user } }
  );
  await activityCollection.updateOne(
    { name: group },
    { $inc: { "capacity.0": 1 } }
  );
  await userCollection.updateOne({ email: user }, { $set: { group: group } });
}

async function leaveGroup(user, group) {
  await activityCollection.updateOne(
    { name: group },
    { $pull: { participants: user } }
  );
  await activityCollection.updateOne(
    { name: group },
    { $inc: { "capacity.0": -1 } }
  );
  await userCollection.updateOne({ email: user }, { $set: { group: "" } });
}

async function setGroups(groups) {
  groupCollection.deleteMany({});
  await groupCollection.insertMany(groups);
}

async function addChat(groupName, chat) {
  await chatCollection.updateOne(
    { name: groupName },
    { $set: { chats: chat } }
  );
}

async function getChat(chatName) {
  chats = await chatCollection.findOne({ name: chatName });
  //console.log("chats.chats (in getChats from database): ", chats.chats);
  return chats.chats;
}

async function setChats(chats) {
  await chatCollection.deleteMany({});
  await chatCollection.insertMany(chats);
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  getActivities,
  getActivityByGroup,
  setActivities,
  getGroup,
  joinGroup,
  leaveGroup,
  setGroups,
  addChat,
  getChat,
  setChats,
};
