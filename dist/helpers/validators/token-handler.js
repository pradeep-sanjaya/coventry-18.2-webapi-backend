"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAuthTokenforUser;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getAuthTokenforUser({
  user
}) {
  const accessToken = _jsonwebtoken.default.sign({
    username: user.username,
    role: user.role
  }, _config.default.JWT_SECRET_KEY);

  return accessToken;
}
//# sourceMappingURL=token-handler.js.map