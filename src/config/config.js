import dotenv from "dotenv";
dotenv.config();

let config = {
    databaseUrl: process.env.MONGODB_URL || null,
    databasePort: process.env.PORT || 9090
};

export default config;
