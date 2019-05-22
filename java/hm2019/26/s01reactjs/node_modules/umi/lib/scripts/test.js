"use strict";

var _yargsParser = _interopRequireDefault(require("yargs-parser"));

var _buildDevOpts = _interopRequireDefault(require("../buildDevOpts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'development';
const args = (0, _yargsParser.default)(process.argv.slice(2));

const Service = require('umi-build-dev/lib/Service').default;

new Service((0, _buildDevOpts.default)(args)).run('test', args);