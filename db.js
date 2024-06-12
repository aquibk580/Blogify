require("dotenv").config();
const { connect } = require("mongoose");
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const URI = `mongodb+srv://${username}:${password}@first.ec7pczh.mongodb.net/blogify`;

const connectToMongo = async () => {
  await connect(URI);
  console.log("Connected to mongoDB Successfully");
};

module.exports = connectToMongo;
