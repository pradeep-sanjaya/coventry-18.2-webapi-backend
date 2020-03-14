var config = {};

config.DB_URL = process.env.MONGO_URL || null;

config.PORT = process.env.WEB_PORT || 9090;

config.JWT_SECRET_KEY = "abcdefghijklmnop1234567890"

export default config;