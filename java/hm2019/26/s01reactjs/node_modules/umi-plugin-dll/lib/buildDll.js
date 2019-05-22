"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _rimraf = _interopRequireDefault(require("rimraf"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _default(opts = {}) {
  const dllDir = opts.dllDir,
        api = opts.api,
        include = opts.include,
        exclude = opts.exclude;
  const paths = api.paths,
        _resolveDeps = api._resolveDeps,
        _api$_ = api._,
        pullAll = _api$_.pullAll,
        uniq = _api$_.uniq;
  const pkgFile = (0, _path.join)(paths.cwd, 'package.json');
  const pkg = (0, _fs.existsSync)(pkgFile) ? require(pkgFile) : {}; // eslint-disable-line

  const depNames = pullAll(uniq(Object.keys(pkg.dependencies || {}).concat(include || [])), exclude).filter(dep => {
    return dep !== 'umi' && !dep.startsWith('umi-plugin-');
  });

  const webpack = require(_resolveDeps('af-webpack/webpack'));

  const files = uniq([...depNames, 'umi/link', 'umi/dynamic', 'umi/navlink', 'umi/redirect', 'umi/router', 'umi/withRouter', 'umi/_renderRoutes', 'umi/_createHistory', 'react', 'react-dom', 'react-router-dom']).sort((a, b) => a > b ? 1 : -1);
  const filesInfoFile = (0, _path.join)(dllDir, 'filesInfo.json');

  if ((0, _fs.existsSync)(filesInfoFile)) {
    if (JSON.parse((0, _fs.readFileSync)(filesInfoFile, 'utf-8')).join(', ') === files.join(', ')) {
      console.log(`[umi-plugin-dll] File list is equal, don't generate the dll file.`);
      return Promise.resolve();
    }
  }

  const afWebpackOpts = api.applyPlugins('modifyAFWebpackOpts', {
    initialValue: {
      cwd: paths.cwd,
      disableBabelTransform: true,
      alias: {},
      babel: {}
    }
  });

  const afWebpackConfig = require(_resolveDeps('af-webpack/getConfig')).default(afWebpackOpts);

  const webpackConfig = _objectSpread({}, afWebpackConfig, {
    entry: {
      umi: files
    },
    output: {
      path: dllDir,
      filename: '[name].dll.js',
      library: '[name]',
      publicPath: api.webpackConfig.output.publicPath
    },
    plugins: [...afWebpackConfig.plugins, ...api.webpackConfig.plugins.filter(plugin => {
      return plugin instanceof webpack.DefinePlugin;
    }), new webpack.DllPlugin({
      path: (0, _path.join)(dllDir, '[name].json'),
      name: '[name]',
      context: paths.absSrcPath
    })],
    resolve: _objectSpread({}, afWebpackConfig.resolve, {
      alias: _objectSpread({}, afWebpackConfig.resolve.alias, api.webpackConfig.resolve.alias)
    })
  });

  return new Promise((resolve, reject) => {
    require(_resolveDeps('af-webpack/build')).default({
      webpackConfig,

      onSuccess() {
        console.log('[umi-plugin-dll] Build dll done');
        (0, _fs.writeFileSync)(filesInfoFile, JSON.stringify(files), 'utf-8');
        resolve();
      },

      onFail({
        err
      }) {
        _rimraf.default.sync(dllDir);

        reject(err);
      }

    });
  });
}