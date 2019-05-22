"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _fs = require("fs");

function _default(api) {
  const paths = api.service.paths;
  const globalFiles = [(0, _path.join)(paths.absSrcPath, 'global.tsx'), (0, _path.join)(paths.absSrcPath, 'global.ts'), (0, _path.join)(paths.absSrcPath, 'global.jsx'), (0, _path.join)(paths.absSrcPath, 'global.js')];
  api.addEntryImportAhead(() => {
    return globalFiles.filter(f => (0, _fs.existsSync)(f)).slice(0, 1).map(f => ({
      source: (0, _path.relative)(paths.absTmpDirPath, f)
    }));
  });
  api.addPageWatcher(globalFiles);
}