"use strict";

var _yargsParser = _interopRequireDefault(require("yargs-parser"));

var _buildDevOpts = _interopRequireDefault(require("../buildDevOpts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const args = (0, _yargsParser.default)(process.argv.slice(2));

if (args.mode === 'production') {
  process.env.NODE_ENV = 'production';
} else {
  process.env.NODE_ENV = 'development';
}

const Service = require('umi-build-dev/lib/Service').default;

new Service((0, _buildDevOpts.default)(args)).run('inspect', args);