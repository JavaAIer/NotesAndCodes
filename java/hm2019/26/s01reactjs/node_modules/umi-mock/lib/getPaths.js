"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

function _default(cwd) {
  const absMockPath = (0, _path.join)(cwd, 'mock');
  const absConfigPath = (0, _path.join)(cwd, '.umirc.mock.js');
  const absConfigPathWithTS = (0, _path.join)(cwd, '.umirc.mock.ts');
  return {
    absMockPath,
    absConfigPath,
    absConfigPathWithTS
  };
}