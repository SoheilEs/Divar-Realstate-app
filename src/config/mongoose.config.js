const mongoose = require("mongoose");
const dontenv = require("dotenv");
dontenv.config();


async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) return console.log("DB already connected...");
    await mongoose.connect(process.env.DB_URI);
    console.log("DB is Connected");
  } catch (err) {
    console.log(err?.message ?? "Failed DB Connection...");
  }
}

module.exports = connectDB;

