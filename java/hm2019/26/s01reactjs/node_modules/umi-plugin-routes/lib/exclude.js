"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(routes, excludes) {
  function exclude(routes) {
    return routes.filter(route => {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = excludes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const exclude = _step.value;
          (0, _assert.default)(typeof exclude === 'function' || exclude instanceof RegExp, `exclude should be function or RegExp`);

          if (typeof exclude === 'function' && exclude(route)) {
            return false;
          }

          if (route.component && !route.component.startsWith('() =>') && exclude instanceof RegExp && exclude.test(route.component)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (route.routes) {
        route.routes = exclude(route.routes);
      }

      return true;
    });
  }

  return exclude(routes);
}