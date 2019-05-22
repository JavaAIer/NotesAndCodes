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

var _default = api => {
  const paths = api.paths,
        config = api.config,
        log = api.log;
  return class Generator extends api.Generator {
    constructor(args, options) {
      super(args, options);
      (0, _assert.default)(typeof this.args[0] === 'string', `
${_chalk.default.underline.cyan('name')} should be supplied

Example: 

  umi g page users
        `.trim());

      if (config.routes) {
        log.warn(`You should config the routes in config.routes manunally since ${_chalk.default.red('config.routes')} exists`);
        console.log();
      }
    }

    writing() {
      const path = this.args[0].toString();
      const jsxExt = this.isTypeScript ? 'tsx' : 'js';
      const cssExt = this.options.less ? 'less' : 'css';
      const context = {
        name: (0, _path.basename)(path),
        color: (0, _randomColor.default)().hexString(),
        isTypeScript: this.isTypeScript,
        cssExt,
        jsxExt
      };
      this.fs.copyTpl(this.templatePath('page.js'), (0, _path.join)(paths.absPagesPath, `${path}.${jsxExt}`), context);
      this.fs.copyTpl(this.templatePath('page.css'), (0, _path.join)(paths.absPagesPath, `${path}.${cssExt}`), context);
    }

  };
};

exports.default = _default;