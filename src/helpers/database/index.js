import mongoose from "mongoose";

import config from "../../config/config";

export default async function makeDb() {
    mongoose.connect(config.databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
            console.log("Connected to %s", config.databaseUrl);
            console.log("Backend is running... \n");
            console.log("Press CTRL + C to stop the process. \n");
        }).catch(err => {
        console.error("App starting error:", err.message);
        process.exit(1);
    });

    let database = mongoose.connection;

    database.once("open", () => console.log("connected to the database"));

    // checks if connection with the database is successful
    database.on("error", console.error.bind(console, "MongoDB connection error:"));

    return database;
}
