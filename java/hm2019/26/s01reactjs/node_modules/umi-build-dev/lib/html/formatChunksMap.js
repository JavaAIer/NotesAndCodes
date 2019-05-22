"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

function _default(chunks = {}) {
  return Object.keys(chunks).reduce((memo, key) => {
    chunks[key].forEach(file => {
      if (!file.includes('.hot-update')) {
        memo[`${key}${(0, _path.extname)(file)}`] = file;
      }
    });
    return memo;
  }, {});
}