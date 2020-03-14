"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("../database"));

var _usersList = _interopRequireDefault(require("../../users/users-list"));

var _authEndpoint = _interopRequireDefault(require("./auth-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _database.default)();
const userList = (0, _usersList.default)({
  database
});
const authEndpointHandler = (0, _authEndpoint.default)({
  userList
});
var _default = authEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map