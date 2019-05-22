"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _getConstVarsFromPath = _interopRequireDefault(require("./getConstVarsFromPath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(content, {
  path
}) {
  const vars = (0, _getConstVarsFromPath.default)(path);
  const replaceReg = new RegExp(Array.from(vars.keys()).join('|'), 'g');
  return content.replace(replaceReg, match => {
    return vars.get(match);
  });
}