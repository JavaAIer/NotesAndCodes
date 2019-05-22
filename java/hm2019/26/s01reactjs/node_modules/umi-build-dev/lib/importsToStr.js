"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _umiUtils = require("umi-utils");

function _default(imports) {
  return imports.map(imp => {
    const source = imp.source,
          specifier = imp.specifier;

    if (specifier) {
      return `import ${specifier} from '${(0, _umiUtils.winPath)(source)}'`;
    } else {
      return `import '${(0, _umiUtils.winPath)(source)}';`;
    }
  });
}