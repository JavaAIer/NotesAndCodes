"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _lodash = require("lodash");

function funcToStr(obj) {
  if (typeof obj === 'function') return obj.toString();

  if ((0, _lodash.isPlainObject)(obj)) {
    return Object.keys(obj).reduce((memo, key) => {
      memo[key] = funcToStr(obj[key]);
      return memo;
    }, {});
  } else {
    return obj;
  }
}

function _default(a, b) {
  return (0, _lodash.isEqual)(funcToStr(a), funcToStr(b));
}