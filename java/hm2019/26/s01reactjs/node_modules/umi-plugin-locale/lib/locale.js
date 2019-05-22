function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-undef, prefer-rest-params */
var ReactIntl = require('react-intl');

function setLocale(lang) {
  if (lang !== undefined && !/^([a-z]{2})-([A-Z]{2})$/.test(lang)) {
    // for reset when lang === undefined
    throw new Error('setLocale lang format error');
  }

  if (getLocale() !== lang) {
    window.localStorage.setItem('umi_locale', lang || '');
    window.location.reload();
  }
}

function getLocale() {
  return window.g_lang;
} // init api methods


var intl;
var intlApi = {};
['formatMessage', 'formatHTMLMessage', 'formatDate', 'formatTime', 'formatRelative', 'formatNumber', 'formatPlural', 'now', 'onError'].forEach(function (methodName) {
  intlApi[methodName] = function () {
    if (intl && intl[methodName]) {
      var _intl$methodName;

      // _setIntlObject has been called
      return (_intl$methodName = intl[methodName]).call.apply(_intl$methodName, [intl].concat(Array.prototype.slice.call(arguments)));
    } else if (console && console.warn) {
      console.warn("[umi-plugin-locale] ".concat(methodName, " not initialized yet, you should use it after react app mounted."));
    }

    return null;
  };
}); // react-intl 没有直接暴露 formatMessage 这个方法
// 只能注入到 props 中，所以通过在最外层包一个组件然后组件内调用这个方法来把 intl 这个对象暴露到这里来
// TODO 查找有没有更好的办法

function _setIntlObject(theIntl) {
  // umi 系统 API，不对外暴露
  intl = theIntl;
}

module.exports = _objectSpread({}, ReactIntl, intlApi, {
  setLocale: setLocale,
  getLocale: getLocale,
  _setIntlObject: _setIntlObject
});