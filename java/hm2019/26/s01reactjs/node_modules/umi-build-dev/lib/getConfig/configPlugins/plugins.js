"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _assert = _interopRequireDefault(require("assert"));

var _getPlugins = require("../../getPlugins");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('umi-build-dev:configPlugin:plugins');

function _default(api) {
  return {
    name: 'plugins',

    validate(val) {
      (0, _assert.default)(Array.isArray(val), `Configure item plugins should be Array, but got ${val}.`);
    },

    onChange(newConfig, oldConfig) {
      debug(`plugins changed from ${oldConfig[this.name]} to ${newConfig[this.name]}`);
      const result = (0, _getPlugins.diffPlugins)(newConfig[this.name], oldConfig[this.name], {
        cwd: api.service.cwd
      });

      if (result.pluginsChanged) {
        api.service.restart('Config plugins Changed');
      } else {
        debug(`result.optionChanged: ${result.optionChanged}`);
        result.optionChanged.forEach(({
          id,
          opts
        }) => {
          api.service.changePluginOption(id, opts);
        });
      }
    }

  };
}