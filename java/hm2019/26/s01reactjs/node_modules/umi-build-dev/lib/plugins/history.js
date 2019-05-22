"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getHistoryConfig(val) {
  return Array.isArray(val) ? val : [val];
}

function _default(api) {
  const config = api.service.config;

  api._registerConfig(() => {
    return api => {
      return {
        name: 'history',

        validate(val) {
          const _getHistoryConfig = getHistoryConfig(val),
                _getHistoryConfig2 = _slicedToArray(_getHistoryConfig, 1),
                historyType = _getHistoryConfig2[0];

          (0, _assert.default)(['browser', 'hash', 'memory'].includes(historyType), `history should be browser or hash, but got ${historyType}`);
        },

        onChange() {
          api.service.restart(
          /* why */
          'Config history Changed');
        }

      };
    };
  });

  api.modifyEntryHistory(memo => {
    const _getHistoryConfig3 = getHistoryConfig(config.history),
          _getHistoryConfig4 = _slicedToArray(_getHistoryConfig3, 2),
          historyType = _getHistoryConfig4[0],
          opts = _getHistoryConfig4[1];

    if (historyType === 'hash') {
      const hashOpts = JSON.stringify(opts || {});
      return `require('history/createHashHistory').default(${hashOpts})`;
    } else if (historyType === 'memory') {
      return `require('history/createMemoryHistory').default({ initialEntries: window.g_initialEntries })`;
    }

    return memo;
  });
  api.addHTMLHeadScript((memo, {
    route
  }) => {
    return config.history === 'memory' ? [{
      content: `window.g_initialEntries = ['${route.path}'];`
    }] : [];
  });
}