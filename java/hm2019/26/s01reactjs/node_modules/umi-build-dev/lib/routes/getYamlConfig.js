"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _esprimaExtractComments = _interopRequireDefault(require("esprima-extract-comments"));

var _jsYaml = _interopRequireDefault(require("js-yaml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const debug = require('debug')('umi-build-dev:getYamlConfig');

function _default(code) {
  const comments = (0, _esprimaExtractComments.default)(code);
  return comments.slice(0, 1).filter(c => c.value.includes(':') && c.loc.start.line === 1).reduce((memo, item) => {
    const value = item.value;
    const v = value.replace(/^(\s+)?\*/gm, '');
    debug(v);

    try {
      const yamlResult = _jsYaml.default.safeLoad(v);

      return _objectSpread({}, memo, yamlResult);
    } catch (e) {
      console.error(`yaml load failed: ${e}`);
    }

    return memo;
  }, {});
}