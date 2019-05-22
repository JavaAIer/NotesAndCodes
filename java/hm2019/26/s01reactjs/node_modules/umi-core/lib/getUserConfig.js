"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfigFile = getConfigFile;
exports.addAffix = addAffix;
exports.mergeConfigs = mergeConfigs;
exports.getConfigByConfigFile = getConfigByConfigFile;
exports.getConfigPaths = getConfigPaths;
exports.cleanConfigRequireCache = cleanConfigRequireCache;
exports.default = _default;

var _path = require("path");

var _fs = require("fs");

var _assert = _interopRequireDefault(require("assert"));

var _extend = _interopRequireDefault(require("extend2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getConfigFile(cwd) {
  const files = process.env.UMI_CONFIG_FILE ? process.env.UMI_CONFIG_FILE.split(',').filter(v => v && v.trim()) : ['.umirc.ts', '.umirc.js', 'config/config.ts', 'config/config.js'];
  const validFiles = files.filter(f => (0, _fs.existsSync)((0, _path.join)(cwd, f)));
  (0, _assert.default)(validFiles.length <= 1, `Multiple config files (${validFiles.join(', ')}) were detected, please keep only one.`);
  return validFiles[0] && (0, _path.join)(cwd, validFiles[0]);
}

function addAffix(file, affix) {
  const ext = (0, _path.extname)(file);
  return file.replace(new RegExp(`${ext}$`), `.${affix}${ext}`);
}

function defaultOnError(e) {
  console.error(e);
}

function requireFile(f, opts = {}) {
  if (!(0, _fs.existsSync)(f)) {
    return {};
  }

  const _opts$onError = opts.onError,
        onError = _opts$onError === void 0 ? defaultOnError : _opts$onError;
  let ret = {};

  try {
    ret = require(f) || {}; // eslint-disable-line
  } catch (e) {
    onError(e, f);
  } // support esm + babel transform


  return ret.default || ret;
}

function mergeConfigs(...configs) {
  return (0, _extend.default)(true, ...configs);
}

function getConfigByConfigFile(configFile, opts = {}) {
  const umiEnv = process.env.UMI_ENV;
  const isDev = process.env.NODE_ENV === 'development';
  const defaultConfig = opts.defaultConfig,
        onError = opts.onError;
  const requireOpts = {
    onError
  };
  const configs = [defaultConfig, requireFile(configFile, requireOpts), umiEnv && requireFile(addAffix(configFile, umiEnv), requireOpts), isDev && requireFile(addAffix(configFile, 'local'), requireOpts)];
  return mergeConfigs(...configs);
}

function getConfigPaths(cwd) {
  const env = process.env.UMI_ENV;
  return [(0, _path.join)(cwd, 'config/'), (0, _path.join)(cwd, '.umirc.js'), (0, _path.join)(cwd, '.umirc.ts'), (0, _path.join)(cwd, '.umirc.local.js'), (0, _path.join)(cwd, '.umirc.local.ts'), ...(env ? [(0, _path.join)(cwd, `.umirc.${env}.js`), (0, _path.join)(cwd, `.umirc.${env}.ts`)] : [])];
}

function cleanConfigRequireCache(cwd) {
  const paths = getConfigPaths(cwd);
  Object.keys(require.cache).forEach(file => {
    if (paths.some(path => {
      return file.indexOf(path) === 0;
    })) {
      delete require.cache[file];
    }
  });
}

function _default(opts = {}) {
  const cwd = opts.cwd,
        defaultConfig = opts.defaultConfig;
  const absConfigFile = getConfigFile(cwd); // 一定要主的 config 文件，UMI_ENV 才会生效

  if (absConfigFile) {
    return getConfigByConfigFile(absConfigFile, {
      defaultConfig
    });
  } else {
    return {};
  }
}