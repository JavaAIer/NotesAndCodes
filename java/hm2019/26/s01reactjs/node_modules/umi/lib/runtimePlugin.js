function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import assert from 'assert';
import isPlainObject from 'lodash/isPlainObject';
var plugins = null;
var validKeys = [];
export function init() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  plugins = [];
  validKeys = opts.validKeys || [];
}
export function use(plugin) {
  Object.keys(plugin).forEach(function (key) {
    // TODO: remove default
    // default 是为了兼容内部框架内置的一个 babel 插件问题
    assert(validKeys.concat('default').indexOf(key) > -1, "Invalid key ".concat(key, " from plugin"));
  });
  plugins.push(plugin);
}
export function getItem(key) {
  assert(validKeys.indexOf(key) > -1, "Invalid key ".concat(key));
  return plugins.filter(function (plugin) {
    return key in plugin;
  }).map(function (plugin) {
    return plugin[key];
  });
}

function _compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  var last = funcs.pop();
  return funcs.reduce(function (a, b) {
    return function () {
      return b(a);
    };
  }, last);
}

export function compose(item, _ref) {
  var initialValue = _ref.initialValue;
  if (typeof item === 'string') item = getItem(item);
  return function () {
    return _compose.apply(void 0, _toConsumableArray(item).concat([initialValue]))();
  };
}
export function apply(item, _ref2) {
  var initialValue = _ref2.initialValue,
      args = _ref2.args;
  if (typeof item === 'string') item = getItem(item);
  assert(Array.isArray(item), "item must be Array");
  return item.reduce(function (memo, fn) {
    assert(typeof fn === 'function', "applied item must be function");
    return fn(memo, args);
  }, initialValue);
}
export function applyForEach(item, _ref3) {
  var initialValue = _ref3.initialValue;
  if (typeof item === 'string') item = getItem(item);
  assert(Array.isArray(item), "item must be Array");
  item.forEach(function (fn) {
    assert(typeof fn === 'function', "applied item must be function");
    fn(initialValue);
  });
} // shadow merge

export function mergeConfig(item) {
  if (typeof item === 'string') item = getItem(item);
  assert(Array.isArray(item), "item must be Array");
  return item.reduce(function (memo, config) {
    assert(isPlainObject(config), "Config is not plain object");
    return _objectSpread({}, memo, config);
  }, {});
}