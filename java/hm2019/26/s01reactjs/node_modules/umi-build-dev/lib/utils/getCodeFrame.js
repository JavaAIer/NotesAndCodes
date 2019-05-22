"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = require("fs");

var _codeFrame = require("@babel/code-frame");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function hasCodeFrame(stack) {
  return stack.includes('^') && stack.includes('>');
}

function _default({
  stack,
  message
}, options = {}) {
  const _options$codeFrame = options.codeFrame,
        codeFrame = _options$codeFrame === void 0 ? {} : _options$codeFrame,
        cwd = options.cwd;

  if (hasCodeFrame(stack)) {
    return message;
  } // console.log(stack);


  const re = /at[^(]+\(([^:]+):(\d+):(\d+)\)/;
  const m = stack.match(re);

  if (m) {
    const _m = _slicedToArray(m, 4),
          _ = _m[0],
          file = _m[1],
          line = _m[2],
          column = _m[3];

    if (!file.startsWith('.') && !file.startsWith('/')) {
      return message;
    }

    const rawLines = (0, _fs.readFileSync)(file, 'utf-8');

    if (file.startsWith(cwd)) {
      return [`${file}: ${message} (${line}, ${column})`, (0, _codeFrame.codeFrameColumns)(rawLines, {
        start: {
          line,
          column
        }
      }, _objectSpread({
        highlightCode: true
      }, codeFrame))].join('\n\n');
    } else {
      return message;
    }
  } else {
    return message;
  }
}