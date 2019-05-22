"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api) {
  api._registerConfig(() => {
    return () => {
      return {
        name: 'mountElementId',

        validate(val) {
          (0, _assert.default)(typeof val === 'string', `mountElementId should be String, but got ${val}`);
        },

        onChange() {
          api.restart();
        }

      };
    };
  });

  api.modifyDefaultConfig(memo => {
    memo.mountElementId = 'root';
    return memo;
  });
}