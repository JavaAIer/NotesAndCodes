"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = start;

var _child_process = require("child_process");

var _send = _interopRequireWildcard(require("./send"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

let usedPorts = [];

function start(scriptPath) {
  const execArgv = process.execArgv.slice(0);
  const inspectArgvIndex = execArgv.findIndex(argv => argv.includes('--inspect-brk'));

  if (inspectArgvIndex > -1) {
    const inspectArgv = execArgv[inspectArgvIndex];
    execArgv.splice(inspectArgvIndex, 1, inspectArgv.replace(/--inspect-brk=(.*)/, (match, s1) => {
      let port;

      try {
        port = parseInt(s1) + 1;
      } catch (e) {
        port = 9230; // node default inspect port plus 1.
      }

      if (usedPorts.includes(port)) {
        port++;
      }

      usedPorts.push(port);
      return `--inspect-brk=${port}`;
    }));
  }

  const child = (0, _child_process.fork)(scriptPath, process.argv.slice(2), {
    execArgv
  });
  child.on('message', data => {
    const type = data && data.type || null;

    if (type === _send.RESTART) {
      child.kill();
      start(scriptPath);
    }

    (0, _send.default)(data);
  });
  return child;
}