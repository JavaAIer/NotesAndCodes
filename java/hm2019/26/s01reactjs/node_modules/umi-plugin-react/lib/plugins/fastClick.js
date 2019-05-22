"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

function _default(api, options = {}) {
  const paths = api.paths;
  api.addEntryImport(() => {
    return {
      source: (0, _path.relative)(paths.absTmpDirPath, options.libraryPath || require.resolve('fastclick')),
      specifier: 'FastClick'
    };
  });
  api.addEntryCodeAhead(`
// Initialize fastclick
document.addEventListener(
  'DOMContentLoaded',
  () => {
    FastClick.attach(document.body);
  },
  false,
);
  `.trim());
}