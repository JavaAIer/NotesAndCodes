"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _chokidar = _interopRequireDefault(require("chokidar"));

var _signale = _interopRequireDefault(require("signale"));

var _umiUtils = require("umi-utils");

var _matchMock = _interopRequireDefault(require("./matchMock"));

var _getMockData = _interopRequireDefault(require("./getMockData"));

var _getPaths2 = _interopRequireDefault(require("./getPaths"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('umi-mock:createMiddleware');

function noop() {}

function _default(opts = {}) {
  const cwd = opts.cwd,
        errors = opts.errors,
        config = opts.config,
        absPagesPath = opts.absPagesPath,
        absSrcPath = opts.absSrcPath,
        watch = opts.watch,
        _opts$onStart = opts.onStart,
        onStart = _opts$onStart === void 0 ? noop : _opts$onStart;

  const _getPaths = (0, _getPaths2.default)(cwd),
        absMockPath = _getPaths.absMockPath,
        absConfigPath = _getPaths.absConfigPath,
        absConfigPathWithTS = _getPaths.absConfigPathWithTS;

  const mockPaths = [absMockPath, absConfigPath, absConfigPathWithTS];
  const paths = [...mockPaths, (0, _path.basename)(absSrcPath) === 'src' ? absSrcPath : absPagesPath];
  let mockData = null; // registerBabel 和 clean require cache 包含整个 src 目录
  // 而 watch 只包含 pages/**/_mock.[jt]s

  onStart({
    paths
  });
  fetchMockData();

  if (watch) {
    // chokidar 在 windows 下使用反斜杠组成的 glob 无法正确 watch 文件变动
    // ref: https://github.com/paulmillr/chokidar/issues/777
    const absPagesGlobPath = (0, _umiUtils.winPath)((0, _path.join)(absPagesPath, '**/_mock.[jt]s'));

    const watcher = _chokidar.default.watch([...mockPaths, absPagesGlobPath], {
      ignoreInitial: true
    });

    watcher.on('all', (event, file) => {
      debug(`[${event}] ${file}, reload mock data`);
      errors.splice(0, errors.length);
      cleanRequireCache();
      fetchMockData();

      if (!errors.length) {
        _signale.default.success(`Mock files parse success`);
      }
    });
  }

  function cleanRequireCache() {
    Object.keys(require.cache).forEach(file => {
      if (paths.some(path => {
        return file.indexOf(path) > -1;
      })) {
        delete require.cache[file];
      }
    });
  }

  function fetchMockData() {
    mockData = (0, _getMockData.default)({
      cwd,
      config,
      absPagesPath,

      onError(e) {
        errors.push(e);
      }

    });
  }

  return function UMI_MOCK(req, res, next) {
    const match = mockData && (0, _matchMock.default)(req, mockData);

    if (match) {
      debug(`mock matched: [${match.method}] ${match.path}`);
      return match.handler(req, res, next);
    } else {
      return next();
    }
  };
}