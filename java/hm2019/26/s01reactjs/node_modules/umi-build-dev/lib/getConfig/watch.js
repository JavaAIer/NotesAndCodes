"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = watch;
exports.unwatch = unwatch;

var _chokidar = _interopRequireDefault(require("chokidar"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 按 key 存，值为数组
const watchers = {};

function toAbsolute(p) {
  if ((0, _path.isAbsolute)(p)) {
    return p;
  }

  return (0, _path.join)(process.cwd(), p);
}

function watch(key, files) {
  if (process.env.WATCH_FILES === 'none') return;

  if (!watchers[key]) {
    watchers[key] = [];
  }

  const APP_ROOT = process.env.APP_ROOT;

  const watcher = _chokidar.default.watch(files, {
    ignoreInitial: true,
    cwd: APP_ROOT ? toAbsolute(APP_ROOT) : process.cwd()
  });

  watchers[key].push(watcher);
  return watcher;
}

function unwatch(key) {
  if (!key) {
    return Object.keys(watchers).forEach(unwatch);
  }

  if (watchers[key]) {
    watchers[key].forEach(watcher => {
      watcher.close();
    });
  }
}