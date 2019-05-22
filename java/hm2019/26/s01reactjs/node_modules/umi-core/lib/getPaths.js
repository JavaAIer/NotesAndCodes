"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _fs = require("fs");

function test(path) {
  return (0, _fs.existsSync)(path) && (0, _fs.statSync)(path).isDirectory();
}

function _default(opts) {
  const cwd = opts.cwd,
        config = opts.config;
  const outputPath = config.outputPath || './dist';
  let pagesPath = 'pages';

  if (process.env.PAGES_PATH) {
    pagesPath = process.env.PAGES_PATH;
  } else {
    if (test((0, _path.join)(cwd, 'src/page'))) {
      pagesPath = 'src/page';
    }

    if (test((0, _path.join)(cwd, 'src/pages'))) {
      pagesPath = 'src/pages';
    }

    if (test((0, _path.join)(cwd, 'page'))) {
      pagesPath = 'page';
    }
  }

  const absPagesPath = (0, _path.join)(cwd, pagesPath);
  const absSrcPath = (0, _path.join)(absPagesPath, '../');
  const envAffix = process.env.NODE_ENV === 'development' ? '' : `-production`;
  const tmpDirPath = process.env.UMI_TEMP_DIR ? `${process.env.UMI_TEMP_DIR}${envAffix}` : `${pagesPath}/.umi${envAffix}`;
  const absTmpDirPath = (0, _path.join)(cwd, tmpDirPath);
  return {
    cwd,
    outputPath,
    absOutputPath: (0, _path.join)(cwd, outputPath),
    absNodeModulesPath: (0, _path.join)(cwd, 'node_modules'),
    pagesPath,
    absPagesPath,
    absSrcPath,
    tmpDirPath,
    absTmpDirPath,
    absRouterJSPath: (0, _path.join)(absTmpDirPath, 'router.js'),
    absLibraryJSPath: (0, _path.join)(absTmpDirPath, 'umi.js'),
    absRegisterSWJSPath: (0, _path.join)(absTmpDirPath, 'registerServiceWorker.js'),
    absPageDocumentPath: (0, _path.join)(absPagesPath, 'document.ejs')
  };
}