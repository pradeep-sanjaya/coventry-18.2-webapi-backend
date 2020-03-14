"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hashValue;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saltRounds = 10;

function hashValue({
  password
}) {
  return _bcrypt.default.hashSync(password, saltRounds);
}
//# sourceMappingURL=index.js.map