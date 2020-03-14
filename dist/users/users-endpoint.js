"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeUsersEndpointHandler;

var _httpError = _interopRequireDefault(require("../helpers/validators/http-error"));

var _hasher = _interopRequireDefault(require("../helpers/hasher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeUsersEndpointHandler({
  userList
}) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "POST":
        return postUser(httpRequest.body);

      case "GET":
        return getUser(httpRequest);

      default:
        return (0, _httpError.default)({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        });
    }
  };

  async function getUser(httpRequest) {
    const {
      id
    } = httpRequest.pathParams || {};
    const {
      max,
      before,
      after
    } = httpRequest.queryParams || {};
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: JSON.stringify({})
    };
  }

  async function postUser({
    username,
    password,
    role
  }) {
    try {
      var result = await userList.add({
        "user": {
          username,
          "password": (0, _hasher.default)({
            password
          }),
          role
        }
      });
      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 200,
        data: {
          result
        }
      };
    } catch ({
      errmsg
    }) {
      return (0, _httpError.default)({
        statusCode: 421,
        errorMessage: `${errmsg}.`
      });
    }
  }
}
//# sourceMappingURL=users-endpoint.js.map