"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAuthEndPointHanlder;

var _httpError = _interopRequireDefault(require("../validators/http-error"));

var _hashValidator = _interopRequireDefault(require("../validators/hash-validator"));

var _tokenHandler = _interopRequireDefault(require("../../helpers/validators/token-handler"));

var _hasher = _interopRequireDefault(require("../../helpers/hasher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function response({
  response,
  code
}) {
  return {
    headers: {
      "Content-Type": "application/json"
    },
    statusCode: code,
    data: JSON.stringify({
      response
    })
  };
}

function makeAuthEndPointHanlder({
  userList
}) {
  return async function handle(httpRequest) {
    switch (httpRequest.path) {
      case "/login":
        return loginUser(httpRequest);

      case "/register":
        return registerUser(httpRequest);

      default:
        return (0, _httpError.default)({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        });
    }
  }; //Login single user and return access token

  async function loginUser(httpRequest) {
    let user = await userList.findByUsername({
      "username": httpRequest.body["username"]
    });
    let validPassword = await (0, _hashValidator.default)({
      "password": httpRequest.body["password"],
      "hash": user.password
    });

    if (validPassword) {
      let accessToken = await (0, _tokenHandler.default)({
        user
      });
      return response({
        "response": {
          "success": true,
          "accessToken": accessToken
        },
        "code": 200
      });
    } else {
      return response({
        "response": {
          "success": false,
          "error": "Invalid Credentials"
        },
        "code": 401
      });
    }
  } //Register single user and return access token


  async function registerUser(httpRequest) {
    try {
      var user = await userList.add({
        "user": {
          "username": httpRequest.body["username"],
          "password": (0, _hasher.default)({
            "password": httpRequest.body["password"]
          }),
          "role": httpRequest.body["role"]
        }
      });
      let accessToken = await (0, _tokenHandler.default)({
        user
      });
      return response({
        "response": {
          "success": true,
          "accessToken": accessToken
        },
        "code": 200
      });
    } catch (e) {
      return (0, _httpError.default)({
        statusCode: 405,
        errorMessage: `${e}.`
      });
    }
  }
}
//# sourceMappingURL=auth-endpoint.js.map