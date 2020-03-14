"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("../helpers/database"));

var _usersList = _interopRequireDefault(require("./users-list"));

var _usersEndpoint = _interopRequireDefault(require("./users-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _database.default)();
const userList = (0, _usersList.default)({
  database
});
const usersEndpointHandler = (0, _usersEndpoint.default)({
  userList
});
var _default = usersEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map