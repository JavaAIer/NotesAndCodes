"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _assert = _interopRequireDefault(require("assert"));

var _stringifyObject = _interopRequireDefault(require("stringify-object"));

var _setConfig = _interopRequireDefault(require("../../utils/setConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api) {
  const service = api.service;

  function list() {
    console.log((0, _stringifyObject.default)(api.config, {
      indent: '  '
    }));
  }

  function get(key) {
    if (api.config[key]) {
      console.log((0, _stringifyObject.default)(api.config[key], {
        indent: '  '
      }));
    }
  }

  function set(key, value) {
    console.log('set', key, value);
    console.log('file', service.userConfig.file);
    (0, _setConfig.default)({
      key,
      value,
      file: service.userConfig.file
    });
  }

  function rm(key) {
    console.log('delete', key);
  }

  function configHandler(args) {
    switch (args._[0]) {
      case 'list':
        list();
        break;

      case 'get':
        (0, _assert.default)(args._[1], `key must supplied, e.g. umi config get routes`);
        get(args._[1]);
        break;

      case 'set':
        (0, _assert.default)(args._[1] && args._[2], `key and value must supplied, e.g. umi config set mountElementId root`);
        set(args._[1], args._[2]);
        break;

      case 'delete':
        (0, _assert.default)(args._[1], `key must supplied, e.g. umi config delete externals`);
        rm(args._[1]);
        break;

      default:
        throw new Error(`unsupported action ${args._[0]} for umi config, try list, get, set and delete`);
    }
  }

  api.registerCommand('config', {
    description: '[alpha] update config via cli',
    options: {}
  }, configHandler);
}