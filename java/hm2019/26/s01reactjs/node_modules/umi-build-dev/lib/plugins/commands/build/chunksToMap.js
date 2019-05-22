"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(chunks) {
  return chunks.reduce((memo, chunk) => {
    memo[chunk.name || chunk.id] = chunk.files;
    return memo;
  }, {});
}