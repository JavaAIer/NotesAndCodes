"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api) {
  return {
    name: 'routes',

    validate(val) {
      (0, _assert.default)(Array.isArray(val), `routes should be Array, but got ${val.toString()}.`);
    },

    onChange() {
      api.service.rebuildTmpFiles();
    }

  };
}