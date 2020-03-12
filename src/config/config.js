var config = {};

config.DB_URL = process.env.MONGO_URL || null;

config.PORT = process.env.WEB_PORT || 9090;

export default config;