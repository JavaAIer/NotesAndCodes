"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _assert = _interopRequireDefault(require("assert"));

var _chalk = _interopRequireDefault(require("chalk"));

var _workboxWebpackPlugin = _interopRequireDefault(require("workbox-webpack-plugin"));

var _WebManifestPlugin = _interopRequireDefault(require("./WebManifestPlugin"));

var _generateWebManifest2 = _interopRequireDefault(require("./generateWebManifest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _default(api, options) {
  const pkg = api.pkg,
        relativeToTmp = api.relativeToTmp,
        publicPath = api.config.publicPath,
        absSrcPath = api.paths.absSrcPath;
  (0, _assert.default)(pkg && pkg.name, `You must have ${_chalk.default.underline.cyan('package.json')} and configure ${_chalk.default.underline.cyan('name')} in it when enable pwa.`); // generate webmanifest before workbox generation, so that webmanifest can be added to precached list

  const _generateWebManifest = (0, _generateWebManifest2.default)(api, _objectSpread({}, options.manifestOptions)),
        srcPath = _generateWebManifest.srcPath,
        outputPath = _generateWebManifest.outputPath;

  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.plugin('webmanifest').use(_WebManifestPlugin.default, [{
      publicPath,
      srcPath,
      outputPath,
      pkgName: pkg.name
    }]);
  });

  if (process.env.NODE_ENV === 'production') {
    const mode = options.workboxPluginMode || 'GenerateSW';
    const defaultGenerateSWOptions = mode === 'GenerateSW' ? {
      cacheId: pkg.name,
      skipWaiting: true,
      clientsClaim: true
    } : {
      swSrc: (0, _path.join)(absSrcPath, 'service-worker.js')
    };

    const workboxConfig = _objectSpread({
      // remove manifest.json from exclude list. https://github.com/GoogleChrome/workbox/issues/1665
      exclude: [/\.map$/, /favicon\.ico$/, /^manifest.*\.js?$/]
    }, defaultGenerateSWOptions, options.workboxOptions || {});

    const swDest = workboxConfig.swDest || workboxConfig.swSrc && (0, _path.basename)(workboxConfig.swSrc) || 'service-worker.js';
    api.chainWebpackConfig(webpackConfig => {
      webpackConfig.plugin('workbox').use(_workboxWebpackPlugin.default[mode], [workboxConfig]);
      webpackConfig.resolve.alias.set('register-service-worker', require.resolve('register-service-worker'));
    });
    api.addEntryCode(`
var registerSW = require('${relativeToTmp((0, _path.join)(__dirname, './registerServiceWorker.js'))}').default;
registerSW('${swDest}');
    `.trim());
  }
}