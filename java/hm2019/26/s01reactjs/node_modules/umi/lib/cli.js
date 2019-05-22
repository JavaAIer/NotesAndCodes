"use strict";

var _path = require("path");

var _yargsParser = _interopRequireDefault(require("yargs-parser"));

var _signale = _interopRequireDefault(require("signale"));

var _semver = _interopRequireDefault(require("semver"));

var _buildDevOpts = _interopRequireDefault(require("./buildDevOpts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const script = process.argv[2];
const args = (0, _yargsParser.default)(process.argv.slice(3)); // Node version check

const nodeVersion = process.versions.node;

if (_semver.default.satisfies(nodeVersion, '<6.5')) {
  _signale.default.error(`Node version must >= 6.5, but got ${nodeVersion}`);

  process.exit(1);
} // Notify update when process exits


const updater = require('update-notifier');

const pkg = require('../package.json');

updater({
  pkg
}).notify({
  defer: true
});
process.env.UMI_DIR = (0, _path.dirname)(require.resolve('../package'));
process.env.UMI_VERSION = pkg.version;
const aliasMap = {
  '-v': 'version',
  '--version': 'version',
  '-h': 'help',
  '--help': 'help'
};

switch (script) {
  case 'build':
  case 'dev':
  case 'test':
  case 'inspect':
    require(`./scripts/${script}`);

    break;

  default:
    {
      const Service = require('umi-build-dev/lib/Service').default;

      new Service((0, _buildDevOpts.default)(args)).run(aliasMap[script] || script, args);
      break;
    }
}