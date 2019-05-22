"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(api, option) {
  api.onOptionChange(newOption => {
    option = newOption;
    api.rebuildHTML();
    api.refreshBrowser();
  });
  api.addHTMLLink(() => {
    return option;
  });
}