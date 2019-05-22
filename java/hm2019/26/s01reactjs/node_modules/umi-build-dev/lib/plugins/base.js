"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api) {
  api._registerConfig(() => {
    return api => {
      return {
        name: 'base',

        validate(val) {
          (0, _assert.default)(typeof val === 'string', `base should be String, but got ${val}`);
        },

        onChange() {
          api.service.restart(
          /* why */
          'Config base Changed');
        }

      };
    };
  });
}