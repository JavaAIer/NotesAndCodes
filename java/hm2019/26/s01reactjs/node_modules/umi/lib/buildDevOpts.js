"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _fs = require("fs");

var _isWindows = _interopRequireDefault(require("is-windows"));

var _umiUtils = require("umi-utils");

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(opts = {}) {
  loadDotEnv();
  let cwd = opts.cwd || process.env.APP_ROOT;

  if (cwd) {
    if (!(0, _path.isAbsolute)(cwd)) {
      cwd = (0, _path.join)(process.cwd(), cwd);
    }

    cwd = (0, _umiUtils.winPath)(cwd); // 原因：webpack 的 include 规则得是 \ 才能判断出是绝对路径

    if ((0, _isWindows.default)()) {
      cwd = cwd.replace(/\//g, '\\');
    }
  }

  return {
    cwd
  };
}

function loadDotEnv() {
  const baseEnvPath = (0, _path.join)(process.cwd(), '.env');
  const localEnvPath = `${baseEnvPath}.local`;

  const loadEnv = envPath => {
    if ((0, _fs.existsSync)(envPath)) {
      const parsed = (0, _dotenv.parse)((0, _fs.readFileSync)(envPath, 'utf-8'));
      Object.keys(parsed).forEach(key => {
        if (!process.env.hasOwnProperty(key)) {
          process.env[key] = parsed[key];
        }
      });
    }
  };

  loadEnv(baseEnvPath);
  loadEnv(localEnvPath);
}