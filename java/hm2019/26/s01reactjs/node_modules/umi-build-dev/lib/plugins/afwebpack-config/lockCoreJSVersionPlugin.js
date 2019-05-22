"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _umiUtils = require("umi-utils");

const coreJSPath = (0, _path.dirname)(require.resolve('core-js/package.json'));

function _default() {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const filename = (0, _umiUtils.winPath)(state.filename);

        if (filename.endsWith('.umi/polyfills.js') || filename.endsWith('.umi-production/polyfills.js')) {
          const node = path.node;

          if (node.source.value.startsWith('core-js/')) {
            node.source.value = node.source.value.replace('core-js/', `${coreJSPath}/`);
          }
        }
      }

    }
  };
}