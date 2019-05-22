"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _randomColor = _interopRequireDefault(require("random-color"));

var _assert = _interopRequireDefault(require("assert"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = api => {
  const paths = api.paths,
        config = api.config,
        log = api.log;
  return class Generator extends api.Generator {
    constructor(args, options) {
      super(args, options);

      if (config.routes) {
        log.warn(`You should config the routes in config.routes manunally since ${_chalk.default.red('config.routes')} exists`);
        console.log();
      }
    }

    writing() {
      const jsxExt = this.isTypeScript ? 'tsx' : 'js';
      const cssExt = this.options.less ? 'less' : 'css';
      const context = {
        name: 'index',
        title: `Global Layout`,
        color: (0, _randomColor.default)().hexString(),
        isTypeScript: this.isTypeScript,
        jsxExt,
        cssExt
      };

      if (this.options.global) {
        (0, _assert.default)(!this.args.length, `You don't need to specify the path with --global, e.g. umi g layout --global`);
        this.fs.copyTpl(this.templatePath('layout.js'), (0, _path.join)(paths.absSrcPath, `layouts`, `index.${jsxExt}`), context);
        this.fs.copyTpl(this.templatePath('layout.css'), (0, _path.join)(paths.absSrcPath, `layouts`, `index.${cssExt}`), context);
        return;
      }

      const path = this.args[0];
      (0, _assert.default)(typeof path === 'string', `You should specify the path, e.g. umi g layout abc`);
      this.fs.copyTpl(this.templatePath('layout.js'), (0, _path.join)(paths.absPagesPath, path, `_layout.${jsxExt}`), _objectSpread({}, context, {
        name: '_layout',
        title: `Layout for ${path}`
      }));
      this.fs.copyTpl(this.templatePath('layout.css'), (0, _path.join)(paths.absPagesPath, path, `_layout.${cssExt}`), context);
    }

  };
};

exports.default = _default;