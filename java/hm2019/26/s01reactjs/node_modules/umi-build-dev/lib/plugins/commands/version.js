"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _fs = require("fs");

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = api => {
  api.registerCommand('version', {
    description: 'show related versions'
  }, args => {
    const pkg = require((0, _path.join)(process.env.UMI_DIR, 'package.json'));

    if (args.verbose) {
      const versions = api.applyPlugins('addVersionInfo', {
        initialValue: [`umi@${pkg.version}`, `${process.platform} ${process.arch}`, `node@${process.version}`, `umi-build-dev@${require('../../../package').version}`, `af-webpack@${require('af-webpack/package').version}`, `babel-preset-umi@${require('babel-preset-umi/package').version}`, `umi-test@${require('umi-test/package').version}`]
      });
      versions.forEach(version => {
        console.log(version);
      });
    } else {
      console.log(pkg.version);
    }

    if ((0, _fs.existsSync)((0, _path.join)(process.env.UMI_DIR, '.local'))) {
      console.log(_chalk.default.cyan('@local'));
    }
  });
};

exports.default = _default;