"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _getConfig = _interopRequireDefault(require("af-webpack/getConfig"));

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(service) {
  const config = service.config;
  const afWebpackOpts = service.applyPlugins('modifyAFWebpackOpts', {
    initialValue: {
      cwd: service.cwd
    }
  });
  (0, _assert.default)(!('chainConfig' in afWebpackOpts), `chainConfig should not supplied in modifyAFWebpackOpts`);

  afWebpackOpts.chainConfig = webpackConfig => {
    service.applyPlugins('chainWebpackConfig', {
      args: webpackConfig
    });

    if (config.chainWebpack) {
      config.chainWebpack(webpackConfig, {
        webpack: require('af-webpack/webpack')
      });
    }
  };

  return service.applyPlugins('modifyWebpackConfig', {
    initialValue: (0, _getConfig.default)(afWebpackOpts)
  });
}