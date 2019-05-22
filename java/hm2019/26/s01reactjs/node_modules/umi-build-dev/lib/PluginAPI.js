"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _assert = _interopRequireDefault(require("assert"));

var _path = require("path");

var _lodash = _interopRequireWildcard(require("lodash"));

var _mustache = _interopRequireDefault(require("mustache"));

var _umiUtils = require("umi-utils");

var _signale = _interopRequireDefault(require("signale"));

var _BasicGenerator = _interopRequireDefault(require("./BasicGenerator"));

var _registerBabel = _interopRequireWildcard(require("./registerBabel"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PluginAPI {
  constructor(id, service) {
    _defineProperty(this, "relativeToTmp", path => {
      return this.winPath((0, _path.relative)(this.service.paths.absTmpDirPath, path));
    });

    this.id = id;
    this.service = service; // utils

    this.debug = (0, _debug.default)(`umi-plugin: ${id}`);
    this.log = _signale.default;
    this.winPath = _umiUtils.winPath;
    this._ = _lodash.default;
    this.compatDirname = _umiUtils.compatDirname;
    this.findJS = _umiUtils.findJS;
    this.findCSS = _umiUtils.findCSS;
    this.Mustache = _mustache.default;
    this.Generator = _BasicGenerator.default;
    this.API_TYPE = {
      ADD: Symbol('add'),
      MODIFY: Symbol('modify'),
      EVENT: Symbol('event')
    };

    this._addMethods();
  }

  _resolveDeps(file) {
    return require.resolve(file);
  }

  _addMethods() {
    [['chainWebpackConfig', {
      type: this.API_TYPE.EVENT
    }], ['_registerConfig', {
      type: this.API_TYPE.ADD
    }], 'onStart', 'onStartAsync', 'onDevCompileDone', 'onBuildSuccess', 'onBuildSuccessAsync', 'onBuildFail', 'addPageWatcher', 'addEntryCode', 'addEntryCodeAhead', 'addEntryImport', 'addEntryImportAhead', 'addEntryPolyfillImports', 'addRendererWrapperWithComponent', 'addRendererWrapperWithModule', 'addRouterImport', 'addRouterImportAhead', 'addVersionInfo', 'addUIPlugin', 'modifyAFWebpackOpts', 'modifyEntryRender', 'modifyEntryHistory', 'modifyRouteComponent', 'modifyRouterRootComponent', 'modifyWebpackConfig', '_beforeServerWithApp', 'beforeDevServer', '_beforeDevServerAsync', 'afterDevServer', 'addMiddlewareAhead', 'addMiddleware', 'addMiddlewareBeforeMock', 'addMiddlewareAfterMock', 'modifyRoutes', 'onPatchRoute', 'modifyHTMLContext', 'addHTMLMeta', 'addHTMLLink', 'addHTMLScript', 'addHTMLStyle', 'addHTMLHeadScript', 'modifyHTMLChunks', 'onGenerateFiles', 'onHTMLRebuild', 'modifyDefaultConfig', '_modifyConfig', 'modifyHTMLWithAST', '_modifyHelpInfo', 'addRuntimePlugin', 'addRuntimePluginKey', 'beforeBlockWriting', '_modifyBlockPackageJSONPath', '_modifyBlockDependencies', '_modifyBlockFile', '_modifyBlockTarget', '_modifyCommand', '_modifyBlockNewRouteConfig'].forEach(method => {
      if (Array.isArray(method)) {
        this.registerMethod(...method);
      } else {
        let type;
        const isPrivate = method.charAt(0) === '_';
        const slicedMethod = isPrivate ? method.slice(1) : method;

        if (slicedMethod.indexOf('modify') === 0) {
          type = this.API_TYPE.MODIFY;
        } else if (slicedMethod.indexOf('add') === 0) {
          type = this.API_TYPE.ADD;
        } else if (slicedMethod.indexOf('on') === 0 || slicedMethod.indexOf('before') === 0 || slicedMethod.indexOf('after') === 0) {
          type = this.API_TYPE.EVENT;
        } else {
          throw new Error(`unexpected method name ${method}`);
        }

        this.registerMethod(method, {
          type
        });
      }
    });
  }

  register(hook, fn) {
    (0, _assert.default)(typeof hook === 'string', `The first argument of api.register() must be string, but got ${hook}`);
    (0, _assert.default)(typeof fn === 'function', `The second argument of api.register() must be function, but got ${fn}`);
    const pluginHooks = this.service.pluginHooks;
    pluginHooks[hook] = pluginHooks[hook] || [];
    pluginHooks[hook].push({
      fn
    });
  }

  registerCommand(name, opts, fn) {
    this.service.registerCommand(name, opts, fn);
  }

  registerGenerator(name, opts) {
    const generators = this.service.generators;
    (0, _assert.default)(typeof name === 'string', `name should be supplied with a string, but got ${name}`);
    (0, _assert.default)(opts && opts.Generator, `opts.Generator should be supplied`);
    (0, _assert.default)(!(name in generators), `Generator ${name} exists, please select another one.`);
    generators[name] = opts;
  }

  registerPlugin(opts) {
    (0, _assert.default)((0, _lodash.isPlainObject)(opts), `opts should be plain object, but got ${opts}`);
    const id = opts.id,
          apply = opts.apply;
    (0, _assert.default)(id && apply, `id and apply must supplied`);
    (0, _assert.default)(typeof id === 'string', `id must be string`);
    (0, _assert.default)(typeof apply === 'function', `apply must be function`);
    (0, _assert.default)(id.indexOf('user:') !== 0 && id.indexOf('built-in:') !== 0, `api.registerPlugin() should not register plugin prefixed with user: and built-in:`);
    (0, _assert.default)(Object.keys(opts).every(key => ['id', 'apply', 'opts'].includes(key)), `Only id, apply and opts is valid plugin properties`);
    this.service.extraPlugins.push(opts);
  }

  registerMethod(name, opts) {
    (0, _assert.default)(!this[name], `api.${name} exists.`);
    (0, _assert.default)(opts, `opts must supplied`);
    const type = opts.type,
          apply = opts.apply;
    (0, _assert.default)(!(type && apply), `Only be one for type and apply.`);
    (0, _assert.default)(type || apply, `One of type and apply must supplied.`);

    this.service.pluginMethods[name] = (...args) => {
      if (apply) {
        this.register(name, opts => {
          return apply(opts, ...args);
        });
      } else if (type === this.API_TYPE.ADD) {
        this.register(name, opts => {
          return (opts.memo || []).concat(typeof args[0] === 'function' ? args[0](opts.memo, opts.args) : args[0]);
        });
      } else if (type === this.API_TYPE.MODIFY) {
        this.register(name, opts => {
          return typeof args[0] === 'function' ? args[0](opts.memo, opts.args) : args[0];
        });
      } else if (type === this.API_TYPE.EVENT) {
        this.register(name, opts => {
          return args[0](opts.args);
        });
      } else {
        throw new Error(`unexpected api type ${type}`);
      }
    };
  }

  addBabelRegister(files) {
    (0, _assert.default)(Array.isArray(files), `files for registerBabel must be Array, but got ${files}`);
    (0, _registerBabel.addBabelRegisterFiles)(files, {
      cwd: this.service.cwd
    });
    (0, _registerBabel.default)({
      cwd: this.service.cwd
    });
  }

}

exports.default = PluginAPI;