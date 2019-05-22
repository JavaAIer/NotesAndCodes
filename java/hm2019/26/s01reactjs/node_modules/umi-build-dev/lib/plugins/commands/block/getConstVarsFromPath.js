"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _lodash = require("lodash");

var _uppercamelcase = _interopRequireDefault(require("uppercamelcase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stripFirstSlash(path) {
  if (path.charAt(0) === '/') {
    return path.slice(1);
  }
}

function _default(path) {
  let ROUTE_PATH = path;

  if (path.includes('-') || path.includes('_')) {
    ROUTE_PATH = (0, _lodash.toLower)(path);
  }

  const PAGE_NAME = ROUTE_PATH.split('/').pop();
  const BLOCK_NAME = stripFirstSlash(ROUTE_PATH).replace(/\//g, '-');
  return new Map([['ROUTE_PATH', (0, _lodash.toLower)(ROUTE_PATH)], // [XXX][_UPPER]_CAMEL_CASE 需要在 XXX 之前，
  // 因为先替换 XXX 会修改 [XXX][_UPPER]_CAMEL_CASE 里的 XXX
  ['BLOCK_NAME_CAMEL_CASE', (0, _lodash.camelCase)(BLOCK_NAME)], ['BLOCK_NAME', (0, _lodash.toLower)(BLOCK_NAME)], ['PAGE_NAME_UPPER_CAMEL_CASE', (0, _uppercamelcase.default)(PAGE_NAME)], ['PAGE_NAME', (0, _lodash.toLower)(PAGE_NAME)]]);
}