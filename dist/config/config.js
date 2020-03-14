"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var config = {};
config.DB_URL = process.env.MONGO_URL || null;
config.PORT = process.env.WEB_PORT || 9090;
config.JWT_SECRET_KEY = "abcdefghijklmnop1234567890";
var _default = config;
exports.default = _default;
//# sourceMappingURL=config.js.map