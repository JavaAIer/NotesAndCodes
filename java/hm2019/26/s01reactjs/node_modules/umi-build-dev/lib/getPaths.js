"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _getPaths = _interopRequireDefault(require("umi-core/lib/getPaths"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function template(path) {
  return (0, _path.join)(__dirname, '../template', path);
}

function _default(service) {
  const cwd = service.cwd,
        config = service.config;
  return _objectSpread({}, (0, _getPaths.default)({
    cwd,
    config
  }), {
    defaultEntryTplPath: template('entry.js.tpl'),
    defaultRouterTplPath: template('router.js.tpl'),
    defaultHistoryTplPath: template('history.js.tpl'),
    defaultRegisterSWTplPath: template('registerServiceWorker.js'),
    defaultDocumentPath: template('document.ejs')
  });
}