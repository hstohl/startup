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

async function setActivities(activities) {
  await activityCollection.insertMany(activities);
}

async function getGroup(user) {
  return groupCollection.find({ members: user }).toArray();
}

async function joinGroup(user, group) {
  await groupCollection.updateOne(
    { name: group },
    { $push: { members: user } }
  );
}

async function leaveGroup(user, group) {
  await groupCollection.updateOne(
    { name: group },
    { $pull: { members: user } }
  );
}

async function setGroups(groups) {
  await groupCollection.insertMany(groups);
}

async function addChat(chat) {
  // This probably doesn't work
  await chatCollection.insertOne(chat);
}

async function getChat(chatId) {
  // This almost certainly doesn't work
  return chatCollection.findOne({ chatId: chatId });
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  getActivities,
  setActivities,
  getGroup,
  joinGroup,
  leaveGroup,
  setGroups,
  addChat,
  getChat,
};
