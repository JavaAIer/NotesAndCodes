"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = require("fs");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getAliasPathWithKey(alias, key) {
  const thePath = alias[key];

  if (alias[thePath]) {
    return getAliasPathWithKey(alias, thePath);
  }

  return thePath;
}

function _default(api) {
  const debug = api.debug;
  api.registerCommand('test', {
    webpack: true,
    description: 'run test files *.test.js and *.e2e.js'
  }, (args = {}) => {
    const alias = api.webpackConfig.resolve.alias;
    const moduleNameMapper = Object.keys(alias).reduce((memo, key) => {
      const aliasPath = getAliasPathWithKey(alias, key);

      if ((0, _fs.existsSync)(aliasPath) && (0, _fs.statSync)(aliasPath).isDirectory()) {
        memo[`^${key}/(.*)$`] = `${aliasPath}/$1`;
        memo[`^${key}$`] = aliasPath;
      } else {
        memo[`^${key}$`] = aliasPath;
      }

      return memo;
    }, {});
    debug('moduleNameWrapper');
    debug(moduleNameMapper);
    args._ = args._.slice(1);
    if (args.w) args.watch = args.w;

    require('umi-test').default(_objectSpread({
      moduleNameMapper
    }, args)).catch(e => {
      debug(e);
      process.exit(1);
    });
  });
}