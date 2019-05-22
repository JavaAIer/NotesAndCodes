"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _signale = _interopRequireDefault(require("signale"));

var _lodash = require("lodash");

var _assert = _interopRequireDefault(require("assert"));

var _umiMock = require("umi-mock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api) {
  const errors = [];

  api._registerConfig(() => {
    return api => {
      return {
        name: 'mock',

        validate(val) {
          (0, _assert.default)((0, _lodash.isPlainObject)(val), `Configure item mock should be Plain Object, but got ${val}.`);
        },

        onChange() {
          api.service.restart(
          /* why */
          'Config mock Changed');
        }

      };
    };
  });

  api._beforeServerWithApp(({
    app
  }) => {
    if (process.env.MOCK !== 'none' && process.env.HTTP_MOCK !== 'none') {
      const beforeMiddlewares = api.applyPlugins('addMiddlewareBeforeMock', {
        initialValue: []
      });
      const afterMiddlewares = api.applyPlugins('addMiddlewareAfterMock', {
        initialValue: []
      });
      beforeMiddlewares.forEach(m => app.use(m));
      const cwd = api.cwd,
            config = api.config,
            _api$paths = api.paths,
            absPagesPath = _api$paths.absPagesPath,
            absSrcPath = _api$paths.absSrcPath;
      app.use((0, _umiMock.createMiddleware)({
        cwd,
        config,
        errors,
        absPagesPath,
        absSrcPath,
        watch: !process.env.WATCH_FILES,

        onStart({
          paths
        }) {
          api.addBabelRegister(paths);
        }

      }));
      afterMiddlewares.forEach(m => app.use(m));
    }
  });

  api.onDevCompileDone(() => {
    if (errors.length) {
      _signale.default.error(`Mock file parse failed`);

      errors.forEach(e => {
        console.error(e.message);
      });
    }
  });
}