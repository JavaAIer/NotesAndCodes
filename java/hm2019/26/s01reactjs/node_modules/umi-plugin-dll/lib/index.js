"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _serveStatic = _interopRequireDefault(require("serve-static"));

var _buildDll = _interopRequireDefault(require("./buildDll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _default(api, opts = {}) {
  if (process.env.NODE_ENV !== 'development') return;
  const debug = api.debug,
        paths = api.paths;
  const dllDir = (0, _path.join)(paths.absNodeModulesPath, 'umi-dlls');
  const dllManifest = (0, _path.join)(dllDir, 'umi.json');
  api.register('_beforeDevServerAsync', () => {
    return new Promise((resolve, reject) => {
      (0, _buildDll.default)(_objectSpread({
        api,
        dllDir
      }, opts)).then(() => {
        debug('umi-plugin-dll done');
        resolve();
      }).catch(e => {
        console.log('[umi-plugin-dll] error', e);
        reject(e);
      });
    });
  });
  api.addMiddlewareAhead(() => {
    return (0, _serveStatic.default)(dllDir);
  });
  api.chainWebpackConfig(webpackConfig => {
    const webpack = require(api._resolveDeps('af-webpack/webpack')); // eslint-disable-line


    webpackConfig.plugin('dll-reference').use(webpack.DllReferencePlugin, [{
      context: paths.absSrcPath,
      manifest: dllManifest
    }]);
  });
  api.addHTMLHeadScript({
    src: '/umi.dll.js'
  });
}