"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = productsController;

var _ = _interopRequireDefault(require("./"));

var _normalizeRequest = _interopRequireDefault(require("../helpers/normalize-request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function productsController(req, res) {
  const httpRequest = (0, _normalizeRequest.default)(req);
  (0, _.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}
//# sourceMappingURL=product-controller.js.map