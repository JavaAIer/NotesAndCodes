"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _lodash = require("lodash");

var _getPadLength = _interopRequireDefault(require("../../utils/getPadLength"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Reference: https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/commands/help.js
var _default = api => {
  api.registerCommand('help', {
    hide: true
  }, args => {
    const helpInfo = api.applyPlugins('_modifyHelpInfo', {
      initialValue: {
        scriptName: 'umi',
        commands: api.service.commands
      }
    });
    const command = args._[0];

    if (!command) {
      logMainHelp(helpInfo);
    } else {
      logHelpForCommand(command, helpInfo.commands[command]);
    }
  });

  function logMainHelp(helpInfo) {
    console.log(`\n  Usage: ${helpInfo.scriptName} <command> [options]\n` + `\n  Commands:\n`);
    const commands = helpInfo.commands;
    const padLength = (0, _getPadLength.default)(commands);

    for (const name in commands) {
      const opts = commands[name].opts || {};

      if (opts.hide !== true) {
        console.log(`    ${_chalk.default.green((0, _lodash.padEnd)(name, padLength))}${opts.description || ''}`);
      }
    }

    console.log(`\n  run ${_chalk.default.blue(`${helpInfo.scriptName} help [command]`)} for usage of a specific command.\n`);
  }

  function logHelpForCommand(name, command) {
    if (!command) {
      console.log(_chalk.default.red(`\n  command "${name}" does not exist.`));
    } else {
      const opts = command.opts || {};

      if (opts.usage) {
        console.log(`\n  Usage: ${opts.usage}`);
      }

      if (opts.options) {
        console.log(`\n  Options:\n`);
        const padLength = (0, _getPadLength.default)(opts.options);

        for (const name in opts.options) {
          console.log(`    ${_chalk.default.green((0, _lodash.padEnd)(name, padLength))}${opts.options[name]}`);
        }
      }

      if (opts.details) {
        console.log();
        console.log(opts.details.split('\n').map(line => `  ${line}`).join('\n'));
      }

      console.log();
    }
  }
};

exports.default = _default;