"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api) {
  return {
    name: 'disableRedirectHoist',

    validate(val) {
      (0, _assert.default)(typeof val === 'boolean', `disableRedirectHoist should be Boolean, but got ${val.toString()}.`);
    },

    onChange() {
      api.service.rebuildTmpFiles();
    }

  };
}