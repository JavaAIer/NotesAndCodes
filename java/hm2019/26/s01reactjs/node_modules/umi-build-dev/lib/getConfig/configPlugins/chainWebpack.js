"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api) {
  return {
    name: 'chainWebpack',

    validate(val) {
      (0, _assert.default)(typeof val === 'function', `Configure item outputPath should be Function, but got ${val}.`);
    },

    onChange() {
      api.service.restart(
      /* why */
      'Configure item chainWebpack Changed.');
    }

  };
}