"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeDb;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("../../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function makeDb() {
  _mongoose.default.connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true
  });

  let db = _mongoose.default.connection;
  db.once("open", () => console.log("connected to the database")); // checks if connection with the database is successful

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  return db;
}
//# sourceMappingURL=index.js.map