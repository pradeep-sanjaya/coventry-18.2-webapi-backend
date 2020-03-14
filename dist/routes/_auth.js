"use strict";

var _express = _interopRequireDefault(require("express"));

var _authController = _interopRequireDefault(require("../helpers/auth/auth-controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _authrouter = _express.default.Router();

/* GET users login. */
_authrouter.post('/login', function (req, res, next) {
  (0, _authController.default)(req, res);
});
/* GET users register. */


_authrouter.post('/register', function (req, res, next) {
  (0, _authController.default)(req, res);
});

module.exports = _authrouter;
//# sourceMappingURL=_auth.js.map