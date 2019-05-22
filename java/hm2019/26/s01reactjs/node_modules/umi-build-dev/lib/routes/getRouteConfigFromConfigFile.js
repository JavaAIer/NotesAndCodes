"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = _interopRequireDefault(require("assert"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = configFile => {
  const routesConfig = JSON.parse((0, _fs.readFileSync)(configFile));
  (0, _assert.default)(Array.isArray(routesConfig), `routes config must be Array, but got ${routesConfig}`);
  return routesConfig;
};

exports.default = _default;