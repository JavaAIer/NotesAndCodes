"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBabelRegisterFiles = addBabelRegisterFiles;
exports.default = _default;

var _path = require("path");

var _fs = require("fs");

var _registerBabel = _interopRequireDefault(require("af-webpack/registerBabel"));

var _umiUtils = require("umi-utils");

var _getUserConfig = require("umi-core/lib/getUserConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let files = null;

function initFiles(cwd) {
  if (files) return;
  files = (0, _getUserConfig.getConfigPaths)(cwd);
}

function addBabelRegisterFiles(extraFiles, {
  cwd
}) {
  initFiles(cwd);
  files.push(...extraFiles);
}

function _default({
  cwd
}) {
  initFiles(cwd);
  const only = files.map(f => {
    const fullPath = (0, _path.isAbsolute)(f) ? f : (0, _path.join)(cwd, f);
    return (0, _umiUtils.winPath)(fullPath);
  });
  let absSrcPath = (0, _path.join)(cwd, 'src');

  if (!(0, _fs.existsSync)(absSrcPath)) {
    absSrcPath = cwd;
  }

  (0, _registerBabel.default)({
    // only suport glob
    // ref: https://babeljs.io/docs/en/next/babel-core.html#configitem-type
    only,
    babelPreset: [require.resolve('babel-preset-umi'), {
      env: {
        targets: {
          node: 8
        }
      },
      transformRuntime: false
    }],
    babelPlugins: [[require.resolve('babel-plugin-module-resolver'), {
      alias: {
        '@': absSrcPath
      }
    }]]
  });
}