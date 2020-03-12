"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("../helpers/database"));

var _productList = _interopRequireDefault(require("./product-list"));

var _productsEndpoint = _interopRequireDefault(require("./products-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _database.default)();
const productList = (0, _productList.default)({
  database
});
const productsEndpointHandler = (0, _productsEndpoint.default)({
  productList
});
var _default = productsEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map