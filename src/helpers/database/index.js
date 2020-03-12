import mongoose from "mongoose";

import config from "../../config/config";

export default async function makeDb() {

  mongoose.connect(process.env.MONGO_URL, {

    useNewUrlParser: true

  });

  let db = mongoose.connection;

  db.once("open", () => console.log("connected to the database"));

  // checks if connection with the database is successful
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  return db;
}
