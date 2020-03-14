"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validatePasswordOfUser;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function validatePasswordOfUser({
  password,
  hash
}) {
  return _bcrypt.default.compare(password, hash);
}
//# sourceMappingURL=hash-validator.js.map