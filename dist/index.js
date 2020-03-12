"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _database = _interopRequireDefault(require("./helpers/database"));

var _productController = _interopRequireDefault(require("./products/product-controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config({
  path: __dirname + '/.env'
});

const app = (0, _express.default)();
app.use(_bodyParser.default.json());
(0, _database.default)();
app.all('/products', _productController.default);
app.get('/products/:id', _productController.default);
app.listen(4000, () => console.log(`Listening on port ${process.env.WEB_PORT}`));
//# sourceMappingURL=index.js.map