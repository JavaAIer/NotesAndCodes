"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _fs = require("fs");

var _chalk = _interopRequireDefault(require("chalk"));

var _lodash = require("lodash");

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api) {
  const paths = api.paths,
        winPath = api.winPath,
        log = api.log;

  api._registerConfig(() => {
    return () => {
      return {
        name: 'targets',

        validate(val) {
          (0, _assert.default)((0, _lodash.isPlainObject)(val), `Configure item targets should be Plain Object, but got ${val}.`);
        },

        onChange() {
          api.service.restart(
          /* why */
          'Config targets Changed');
        }

      };
    };
  });

  function writeTmpFile() {
    const tpl = (0, _fs.readFileSync)((0, _path.join)(__dirname, '../../template/polyfills.js.tpl'), 'utf-8');
    const result = api.Mustache.render(tpl, {
      url: api.config.targets && api.config.targets.ie && api.config.targets.ie <= 11,
      url_polyfill_path: winPath((0, _path.relative)(paths.absTmpDirPath, require.resolve('url-polyfill')))
    });
    api.debug(`write tmp file: polyfills.js, content: ${result}`);
    api.writeTmpFile('polyfills.js', result);
  }

  api.onGenerateFiles(() => {
    writeTmpFile();
  });
  api.addEntryPolyfillImports(() => {
    if (process.env.BABEL_POLYFILL !== 'none') {
      return [{
        source: './polyfills'
      }];
    } else {
      log.warn(_chalk.default.yellow(`Since you have configured the environment variable ${_chalk.default.bold('BABEL_POLYFILL')} to none, no patches will be included.`));
      return [];
    }
  });
  api.chainWebpackConfig(config => {
    config.resolve.alias.set('@babel/polyfill', require.resolve('@babel/polyfill'));
  });
}