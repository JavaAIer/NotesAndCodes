"use strict";

var _fork = _interopRequireDefault(require("umi-build-dev/lib/fork"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const child = (0, _fork.default)(require.resolve('./realDev.js'));
child.on('message', data => {
  if (process.send) {
    process.send(data);
  }
});
child.on('exit', code => {
  if (code === 1) {
    process.exit(code);
  }
});
process.on('SIGINT', () => {
  child.kill('SIGINT');
});