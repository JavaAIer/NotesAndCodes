"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FilesGenerator = _interopRequireDefault(require("../../FilesGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (service, opts = {}) => {
  const RoutesManager = opts.RoutesManager,
        mountElementId = opts.mountElementId;
  return new _FilesGenerator.default({
    service,
    RoutesManager,
    mountElementId,

    modifyPageWatcher(pageWatchers) {
      return service.applyPlugins('addPageWatcher', {
        initialValue: pageWatchers
      });
    }

  });
};

exports.default = _default;