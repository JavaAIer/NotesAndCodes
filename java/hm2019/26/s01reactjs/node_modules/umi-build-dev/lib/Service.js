"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _path = require("path");

var _fs = require("fs");

var _assert = _interopRequireDefault(require("assert"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _lodash = require("lodash");

var _dotenv = require("dotenv");

var _signale = _interopRequireDefault(require("signale"));

var _umiUtils = require("umi-utils");

var _getPaths = _interopRequireDefault(require("./getPaths"));

var _getPlugins = _interopRequireDefault(require("./getPlugins"));

var _PluginAPI = _interopRequireDefault(require("./PluginAPI"));

var _UserConfig = _interopRequireDefault(require("./UserConfig"));

var _registerBabel = _interopRequireDefault(require("./registerBabel"));

var _getCodeFrame = _interopRequireDefault(require("./utils/getCodeFrame"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const debug = require('debug')('umi-build-dev:Service');

class Service {
  constructor({
    cwd
  }) {
    this.cwd = cwd || process.cwd();

    try {
      this.pkg = require((0, _path.join)(this.cwd, 'package.json')); // eslint-disable-line
    } catch (e) {
      this.pkg = {};
    }

    (0, _registerBabel.default)({
      cwd: this.cwd
    });
    this.commands = {};
    this.pluginHooks = {};
    this.pluginMethods = {};
    this.generators = {}; // resolve user config

    this.config = _UserConfig.default.getConfig({
      cwd: this.cwd,
      service: this
    });
    debug(`user config: ${JSON.stringify(this.config)}`); // resolve plugins

    this.plugins = this.resolvePlugins();
    this.extraPlugins = [];
    debug(`plugins: ${this.plugins.map(p => p.id).join(' | ')}`); // resolve paths

    this.paths = (0, _getPaths.default)(this);
  }

  resolvePlugins() {
    try {
      (0, _assert.default)(Array.isArray(this.config.plugins || []), `Configure item ${_chalk.default.underline.cyan('plugins')} should be Array, but got ${_chalk.default.red(typeof this.config.plugins)}`);
      return (0, _getPlugins.default)({
        cwd: this.cwd,
        plugins: this.config.plugins || []
      });
    } catch (e) {
      if (process.env.UMI_TEST) {
        throw new Error(e);
      } else {
        _signale.default.error(e);

        process.exit(1);
      }
    }
  }

  initPlugin(plugin) {
    const id = plugin.id,
          apply = plugin.apply,
          opts = plugin.opts;

    try {
      (0, _assert.default)(typeof apply === 'function', `
plugin must export a function, e.g.

  export default function(api) {
    // Implement functions via api
  }
        `.trim());
      const api = new Proxy(new _PluginAPI.default(id, this), {
        get: (target, prop) => {
          if (this.pluginMethods[prop]) {
            return this.pluginMethods[prop];
          }

          if ([// methods
          'changePluginOption', 'applyPlugins', '_applyPluginsAsync', 'writeTmpFile', // properties
          'cwd', 'config', 'webpackConfig', 'pkg', 'paths', 'routes', // dev methods
          'restart', 'printError', 'printWarn', 'refreshBrowser', 'rebuildTmpFiles', 'rebuildHTML'].includes(prop)) {
            if (typeof this[prop] === 'function') {
              return this[prop].bind(this);
            } else {
              return this[prop];
            }
          } else {
            return target[prop];
          }
        }
      });

      api.onOptionChange = fn => {
        (0, _assert.default)(typeof fn === 'function', `The first argument for api.onOptionChange should be function in ${id}.`);
        plugin.onOptionChange = fn;
      };

      apply(api, opts);
      plugin._api = api;
    } catch (e) {
      if (process.env.UMI_TEST) {
        throw new Error(e);
      } else {
        _signale.default.error(`
Plugin ${_chalk.default.cyan.underline(id)} initialize failed

${(0, _getCodeFrame.default)(e, {
          cwd: this.cwd
        })}
        `.trim());

        debug(e);
        process.exit(1);
      }
    }
  }

  initPlugins() {
    this.plugins.forEach(plugin => {
      this.initPlugin(plugin);
    });
    let count = 0;

    while (this.extraPlugins.length) {
      const extraPlugins = (0, _lodash.cloneDeep)(this.extraPlugins);
      this.extraPlugins = [];
      extraPlugins.forEach(plugin => {
        this.initPlugin(plugin);
        this.plugins.push(plugin);
      });
      count += 1;
      (0, _assert.default)(count <= 10, `插件注册死循环？`);
    } // Throw error for methods that can't be called after plugins is initialized


    this.plugins.forEach(plugin => {
      ['onOptionChange', 'register', 'registerMethod', 'registerPlugin'].forEach(method => {
        plugin._api[method] = () => {
          throw new Error(`api.${method}() should not be called after plugin is initialized.`);
        };
      });
    });
  }

  changePluginOption(id, newOpts) {
    (0, _assert.default)(id, `id must supplied`);
    const plugin = this.plugins.filter(p => p.id === id)[0];
    (0, _assert.default)(plugin, `plugin ${id} not found`);
    plugin.opts = newOpts;

    if (plugin.onOptionChange) {
      plugin.onOptionChange(newOpts);
    } else {
      this.restart(`plugin ${id}'s option changed`);
    }
  }

  applyPlugins(key, opts = {}) {
    debug(`apply plugins ${key}`);
    return (this.pluginHooks[key] || []).reduce((memo, {
      fn
    }) => {
      try {
        return fn({
          memo,
          args: opts.args
        });
      } catch (e) {
        console.error(_chalk.default.red(`Plugin apply failed: ${e.message}`));
        throw e;
      }
    }, opts.initialValue);
  }

  _applyPluginsAsync(key, opts = {}) {
    var _this = this;

    return _asyncToGenerator(function* () {
      debug(`apply plugins async ${key}`);
      const hooks = _this.pluginHooks[key] || [];
      let memo = opts.initialValue;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = hooks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const hook = _step.value;
          const fn = hook.fn;
          memo = yield fn({
            memo,
            args: opts.args
          });
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

      return memo;
    })();
  }

  loadEnv() {
    const basePath = (0, _path.join)(this.cwd, '.env');
    const localPath = `${basePath}.local`;

    const load = path => {
      if ((0, _fs.existsSync)(path)) {
        debug(`load env from ${path}`);
        const parsed = (0, _dotenv.parse)((0, _fs.readFileSync)(path, 'utf-8'));
        Object.keys(parsed).forEach(key => {
          if (!process.env.hasOwnProperty(key)) {
            process.env[key] = parsed[key];
          }
        });
      }
    };

    load(basePath);
    load(localPath);
  }

  writeTmpFile(file, content) {
    const paths = this.paths;
    const path = (0, _path.join)(paths.absTmpDirPath, file);

    _mkdirp.default.sync((0, _path.dirname)(path));

    (0, _fs.writeFileSync)(path, content, 'utf-8');
  }

  init() {
    // load env
    this.loadEnv(); // init plugins

    this.initPlugins(); // reload user config

    const userConfig = new _UserConfig.default(this);
    const config = userConfig.getConfig({
      force: true
    });
    mergeConfig(this.config, config);
    this.userConfig = userConfig;

    if (config.browserslist) {
      (0, _umiUtils.deprecate)('config.browserslist', 'use config.targets instead');
    }

    debug('got user config');
    debug(this.config); // assign user's outputPath config to paths object

    if (config.outputPath) {
      const paths = this.paths;
      paths.outputPath = config.outputPath;
      paths.absOutputPath = (0, _path.join)(paths.cwd, config.outputPath);
    }

    debug('got paths');
    debug(this.paths);
  }

  registerCommand(name, opts, fn) {
    if (typeof opts === 'function') {
      fn = opts;
      opts = null;
    }

    opts = opts || {};
    (0, _assert.default)(!(name in this.commands), `Command ${name} exists, please select another one.`);
    this.commands[name] = {
      fn,
      opts
    };
  }

  run(name = 'help', args) {
    this.init();
    return this.runCommand(name, args);
  }

  runCommand(rawName, rawArgs) {
    debug(`raw command name: ${rawName}, args: ${JSON.stringify(rawArgs)}`);

    const _this$applyPlugins = this.applyPlugins('_modifyCommand', {
      initialValue: {
        name: rawName,
        args: rawArgs
      }
    }),
          name = _this$applyPlugins.name,
          args = _this$applyPlugins.args;

    debug(`run ${name} with args ${JSON.stringify(args)}`);
    const command = this.commands[name];

    if (!command) {
      _signale.default.error(`Command ${_chalk.default.underline.cyan(name)} does not exists`);

      process.exit(1);
    }

    const fn = command.fn,
          opts = command.opts;

    if (opts.webpack) {
      // webpack config
      this.webpackConfig = require('./getWebpackConfig').default(this);
    }

    return fn(args);
  }

}

exports.default = Service;

function mergeConfig(oldConfig, newConfig) {
  Object.keys(oldConfig).forEach(key => {
    if (!(key in newConfig)) {
      delete oldConfig[key];
    }
  });
  (0, _lodash.assign)(oldConfig, newConfig);
  return oldConfig;
}