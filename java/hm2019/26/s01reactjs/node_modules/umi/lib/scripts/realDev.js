"use strict";

var _yargsParser = _interopRequireDefault(require("yargs-parser"));

var _buildDevOpts = _interopRequireDefault(require("../buildDevOpts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let closed = false; // kill(2) Ctrl-C

process.once('SIGINT', () => onSignal('SIGINT')); // kill(3) Ctrl-\

process.once('SIGQUIT', () => onSignal('SIGQUIT')); // kill(15) default

process.once('SIGTERM', () => onSignal('SIGTERM'));

function onSignal(signal) {
  if (closed) return;
  closed = true;
  process.exit(0);
}

process.env.NODE_ENV = 'development';
const args = (0, _yargsParser.default)(process.argv.slice(2));

const Service = require('umi-build-dev/lib/Service').default;

new Service((0, _buildDevOpts.default)(args)).run('dev', args);