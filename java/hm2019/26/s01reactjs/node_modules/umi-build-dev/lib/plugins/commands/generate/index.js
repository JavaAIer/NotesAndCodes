"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = require("fs");

var _assert = _interopRequireDefault(require("assert"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _default(api) {
  const generators = api.service.generators,
        log = api.log;

  function generate(args = {}) {
    try {
      const name = args._[0];
      (0, _assert.default)(name, `run ${_chalk.default.cyan.underline('umi help generate')} to checkout the usage`);
      (0, _assert.default)(generators[name], `Generator ${_chalk.default.cyan.underline(name)} not found`);
      const _generators$name = generators[name],
            Generator = _generators$name.Generator,
            resolved = _generators$name.resolved;
      const generator = new Generator(args._.slice(1), _objectSpread({}, args, {
        env: {
          cwd: api.cwd
        },
        resolved: resolved || __dirname
      }));
      return generator.run().then(() => {
        log.success('');
      }).catch(e => {
        log.error(e);
      });
    } catch (e) {
      log.error(`Generate failed, ${e.message}`);
    }
  }

  function registerCommand(command, description) {
    const details = `
Examples:

  ${_chalk.default.gray('# generate page users')}
  umi generate page users

  ${_chalk.default.gray('# g is the alias for generate')}
  umi g page index

  ${_chalk.default.gray('# generate page with less file')}
  umi g page index --less
  `.trim();
    api.registerCommand(command, {
      description,
      usage: `umi ${command} type name [options]`,
      details
    }, generate);
  }

  registerCommand('g', 'generate code snippets quickly (alias for generate)');
  registerCommand('generate', 'generate code snippets quickly');
  (0, _fs.readdirSync)(`${__dirname}/generators`).filter(f => !f.startsWith('.')).forEach(f => {
    api.registerGenerator(f, {
      Generator: require(`./generators/${f}`).default(api),
      resolved: `${__dirname}/generators/${f}/index`
    });
  });
}