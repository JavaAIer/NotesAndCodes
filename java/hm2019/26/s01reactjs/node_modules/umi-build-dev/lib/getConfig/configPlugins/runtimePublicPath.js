"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api) {
  return {
    name: 'runtimePublicPath',

    validate(val) {
      (0, _assert.default)(typeof val === 'boolean', `Configure item runtimePublicPath should be Boolean, but got ${val}.`);
    },

    onChange() {
      api.service.restart(
      /* why */
      'Configure item runtimePublicPath Changed.');
    }

  };
}