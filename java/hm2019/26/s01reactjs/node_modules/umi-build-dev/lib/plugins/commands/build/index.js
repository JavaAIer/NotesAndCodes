"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _rimraf = _interopRequireDefault(require("rimraf"));

var _umiNotify = _interopRequireDefault(require("umi-notify"));

var _getRouteManager = _interopRequireDefault(require("../getRouteManager"));

var _getFilesGenerator = _interopRequireDefault(require("../getFilesGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api) {
  const service = api.service,
        debug = api.debug,
        config = api.config,
        log = api.log;
  const cwd = service.cwd,
        paths = service.paths;
  api.registerCommand('build', {
    webpack: true,
    description: 'building for production'
  }, () => {
    _umiNotify.default.onBuildStart({
      name: 'umi',
      version: 2
    });

    const RoutesManager = (0, _getRouteManager.default)(service);
    RoutesManager.fetchRoutes();
    return new Promise((resolve, reject) => {
      process.env.NODE_ENV = 'production';
      service.applyPlugins('onStart');

      service._applyPluginsAsync('onStartAsync').then(() => {
        const filesGenerator = (0, _getFilesGenerator.default)(service, {
          RoutesManager,
          mountElementId: config.mountElementId
        });
        filesGenerator.generate();

        if (process.env.HTML !== 'none') {
          const HtmlGeneratorPlugin = require('../getHtmlGeneratorPlugin').default(service); // move html-webpack-plugin to the head, so that
          // other plugins (like workbox-webpack-plugin)
          // which listen to `emit` event can detect assets


          service.webpackConfig.plugins.unshift(new HtmlGeneratorPlugin());
        }

        require('af-webpack/build').default({
          cwd,
          webpackConfig: service.webpackConfig,

          onSuccess({
            stats
          }) {
            debug('Build success');

            if (process.env.RM_TMPDIR !== 'none') {
              debug(`Clean tmp dir ${service.paths.tmpDirPath}`);

              _rimraf.default.sync(paths.absTmpDirPath);
            }

            service.applyPlugins('onBuildSuccess', {
              args: {
                stats
              }
            });

            service._applyPluginsAsync('onBuildSuccessAsync', {
              args: {
                stats
              }
            }).then(() => {
              debug('Build success end');

              _umiNotify.default.onBuildComplete({
                name: 'umi',
                version: 2
              }, {
                err: null
              });

              resolve();
            });
          },

          onFail({
            err,
            stats
          }) {
            service.applyPlugins('onBuildFail', {
              args: {
                err,
                stats
              }
            });

            _umiNotify.default.onBuildComplete({
              name: 'umi',
              version: 2
            }, {
              err
            });

            reject(err);
          }

        });
      });
    });
  });
}