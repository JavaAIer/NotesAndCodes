"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _lodash = require("lodash");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function toObject(o) {
  if (!(0, _lodash.isPlainObject)(o)) {
    return {};
  } else {
    return o;
  }
}

function getId(id) {
  return `umi-plugin-react:${id}`;
}

function getPlugins(obj) {
  return Object.keys(obj).filter(key => obj[key]);
}

function diffPlugins(newOption, oldOption) {
  return Object.keys(newOption).filter(key => {
    return newOption[key] && !(0, _lodash.isEqual)(newOption[key], oldOption[key]);
  });
}

function _default(api, option) {
  const debug = api.debug;
  api.onOptionChange(newOption => {
    debug('new option');
    debug(newOption);

    if ((0, _lodash.isEqual)(getPlugins(newOption), getPlugins(option))) {
      diffPlugins(newOption, option).forEach(key => {
        debug(`change plugin option: ${key}`);
        api.changePluginOption(getId(key), newOption[key]);
      });
      option = newOption;
    } else {
      debug('restart');
      api.restart();
    }
  });
  const plugins = {
    // mobile
    hd: () => require('./plugins/hd').default,
    fastClick: () => require('./plugins/fastClick').default,
    // performance
    library: () => require('./plugins/library').default,
    dynamicImport: () => require('./plugins/dynamicImport').default,
    dll: () => require('./plugins/dll').default,
    hardSource: () => require('./plugins/hardSource').default,
    pwa: () => require('./plugins/pwa').default,
    // html tags
    chunks: () => require('./plugins/chunks').default,
    scripts: () => require('./plugins/scripts').default,
    headScripts: () => require('./plugins/headScripts').default,
    links: () => require('./plugins/links').default,
    metas: () => require('./plugins/metas').default,
    // misc
    dva: () => require('./plugins/dva').default,
    locale: () => require('./plugins/locale').default,
    polyfills: () => require('./plugins/polyfills').default,
    routes: () => require('./plugins/routes').default,
    antd: () => require('./plugins/antd').default,
    title: () => require('./plugins/title').default
  };
  Object.keys(plugins).forEach(key => {
    if (option[key]) {
      let opts = option[key];

      if (key === 'locale') {
        opts = _objectSpread({
          antd: option.antd
        }, opts);
      }

      if (key === 'dva') {
        opts = _objectSpread({
          dynamicImport: option.dynamicImport
        }, toObject(opts));
      }

      api.registerPlugin({
        id: getId(key),
        apply: plugins[key](),
        opts
      });
    }
  });
}