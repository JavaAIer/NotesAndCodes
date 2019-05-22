"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _assert = _interopRequireDefault(require("assert"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api) {
  return {
    name: 'exportStatic',

    validate(val) {
      (0, _assert.default)((0, _lodash.isPlainObject)(val) || typeof val === 'boolean', `Configure item context should be Plain Object, but got ${val}.`);
    },

    onChange() {
      api.service.restart(
      /* why */
      'Config exportStatic Changed');
    }

  };
}