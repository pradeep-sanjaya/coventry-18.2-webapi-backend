"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeProductsEndpointHandler;

var _httpError = _interopRequireDefault(require("../helpers/validators/http-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeProductsEndpointHandler({
  productList
}) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "POST":
        return postProduct(httpRequest);

      case "GET":
        return getProducts(httpRequest);

      default:
        return (0, _httpError.default)({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        });
    }
  };

  async function getProducts(httpRequest) {
    const {
      id
    } = httpRequest.pathParams || {};
    const {
      max,
      before,
      after
    } = httpRequest.queryParams || {};
    const result = id ? {
      "product": {
        "id": 1,
        "name": "dildo"
      }
    } : {
      "product": {
        "name": "product found"
      }
    };
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: JSON.stringify({
        result
      })
    };
  }

  async function postProduct(httpRequest) {}
}
//# sourceMappingURL=products-endpoint.js.map