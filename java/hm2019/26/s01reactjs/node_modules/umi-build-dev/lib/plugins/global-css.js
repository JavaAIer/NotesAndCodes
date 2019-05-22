"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _fs = require("fs");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _default(api) {
  const paths = api.paths,
        winPath = api.winPath;
  const cssFiles = [(0, _path.join)(paths.absSrcPath, 'global.sass'), (0, _path.join)(paths.absSrcPath, 'global.scss'), (0, _path.join)(paths.absSrcPath, 'global.less'), (0, _path.join)(paths.absSrcPath, 'global.css')];
  api.addEntryCode(`
${cssFiles.filter(f => (0, _fs.existsSync)(f)).slice(0, 1).map(f => `require('${winPath((0, _path.relative)(paths.absTmpDirPath, f))}');`).join('')}
    `.trim());
  api.addPageWatcher(cssFiles);
  api.modifyAFWebpackOpts(memo => {
    return _objectSpread({}, memo, {
      cssModulesExcludes: [...(memo.cssModulesExcludes || []), ...cssFiles]
    });
  });
}