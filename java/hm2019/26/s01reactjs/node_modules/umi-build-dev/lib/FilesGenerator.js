"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.watcherIgnoreRegExp = void 0;

var _path = require("path");

var _fs = require("fs");

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _chokidar = _interopRequireDefault(require("chokidar"));

var _assert = _interopRequireDefault(require("assert"));

var _chalk = _interopRequireDefault(require("chalk"));

var _lodash = require("lodash");

var _mustache = _interopRequireDefault(require("mustache"));

var _umiUtils = require("umi-utils");

var _stripJSONQuote = _interopRequireDefault(require("./routes/stripJSONQuote"));

var _routesToJSON = _interopRequireDefault(require("./routes/routesToJSON"));

var _importsToStr = _interopRequireDefault(require("./importsToStr"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('umi:FilesGenerator');

const watcherIgnoreRegExp = /(^|[\/\\])(_mock.js$|\..)/;
exports.watcherIgnoreRegExp = watcherIgnoreRegExp;

class FilesGenerator {
  constructor(opts) {
    Object.keys(opts).forEach(key => {
      this[key] = opts[key];
    });
    this.routesContent = null;
    this.hasRebuildError = false;
  }

  generate() {
    debug('generate');
    const paths = this.service.paths;
    const absTmpDirPath = paths.absTmpDirPath,
          tmpDirPath = paths.tmpDirPath;
    debug(`mkdir tmp dir: ${tmpDirPath}`);

    _mkdirp.default.sync(absTmpDirPath);

    this.generateFiles();
  }

  createWatcher(path) {
    const watcher = _chokidar.default.watch(path, {
      ignored: watcherIgnoreRegExp,
      // ignore .dotfiles and _mock.js
      ignoreInitial: true
    });

    watcher.on('all', (0, _lodash.debounce)((event, path) => {
      debug(`${event} ${path}`);
      this.rebuild();
    }, 100));
    return watcher;
  }

  watch() {
    if (process.env.WATCH_FILES === 'none') return;
    const _this$service = this.service,
          paths = _this$service.paths,
          singular = _this$service.config.singular;
    const layout = singular ? 'layout' : 'layouts';
    let pageWatchers = [paths.absPagesPath, ..._constants.EXT_LIST.map(ext => (0, _path.join)(paths.absSrcPath, `${layout}/index${ext}`)), ..._constants.EXT_LIST.map(ext => (0, _path.join)(paths.absSrcPath, `app${ext}`))];

    if (this.modifyPageWatcher) {
      pageWatchers = this.modifyPageWatcher(pageWatchers);
    }

    this.watchers = pageWatchers.map(p => {
      return this.createWatcher(p);
    });
    process.on('SIGINT', () => {
      this.unwatch();
    });
  }

  unwatch() {
    if (this.watchers) {
      this.watchers.forEach(watcher => {
        watcher.close();
      });
    }
  }

  rebuild() {
    const _this$service2 = this.service,
          refreshBrowser = _this$service2.refreshBrowser,
          printError = _this$service2.printError;

    try {
      this.service.applyPlugins('onGenerateFiles', {
        args: {
          isRebuild: true
        }
      });
      this.generateRouterJS();
      this.generateEntry();
      this.generateHistory();

      if (this.hasRebuildError) {
        refreshBrowser();
        this.hasRebuildError = false;
      }
    } catch (e) {
      // 向浏览器发送出错信息
      printError([e.message]);
      this.hasRebuildError = true;
      this.routesContent = null; // why?

      debug(`Generate failed: ${e.message}`);
      debug(e);
      console.error(_chalk.default.red(e.message));
    }
  }

  generateFiles() {
    this.service.applyPlugins('onGenerateFiles');
    this.generateRouterJS();
    this.generateEntry();
    this.generateHistory();
  }

  generateEntry() {
    const paths = this.service.paths; // Generate umi.js

    const entryTpl = (0, _fs.readFileSync)(paths.defaultEntryTplPath, 'utf-8');
    const initialRender = this.service.applyPlugins('modifyEntryRender', {
      initialValue: `
  const rootContainer = window.g_plugins.apply('rootContainer', {
    initialValue: React.createElement(require('./router').default),
  });
  ReactDOM.render(
    rootContainer,
    document.getElementById('${this.mountElementId}'),
  );
      `.trim()
    });
    const moduleBeforeRenderer = this.service.applyPlugins('addRendererWrapperWithModule', {
      initialValue: []
    }).map((source, index) => {
      return {
        source,
        specifier: `moduleBeforeRenderer${index}`
      };
    });
    const plugins = this.service.applyPlugins('addRuntimePlugin', {
      initialValue: []
    }).map(plugin => {
      return (0, _umiUtils.winPath)((0, _path.relative)(paths.absTmpDirPath, plugin));
    });

    if ((0, _umiUtils.findJS)(paths.absSrcPath, 'app')) {
      plugins.push('@/app');
    }

    const validKeys = this.service.applyPlugins('addRuntimePluginKey', {
      initialValue: ['patchRoutes', 'render', 'rootContainer', 'modifyRouteProps', 'onRouteChange']
    });
    (0, _assert.default)((0, _lodash.uniq)(validKeys).length === validKeys.length, `Conflict keys found in [${validKeys.join(', ')}]`);

    const entryContent = _mustache.default.render(entryTpl, {
      code: this.service.applyPlugins('addEntryCode', {
        initialValue: []
      }).join('\n\n'),
      codeAhead: this.service.applyPlugins('addEntryCodeAhead', {
        initialValue: []
      }).join('\n\n'),
      imports: (0, _importsToStr.default)(this.service.applyPlugins('addEntryImport', {
        initialValue: moduleBeforeRenderer
      })).join('\n'),
      importsAhead: (0, _importsToStr.default)(this.service.applyPlugins('addEntryImportAhead', {
        initialValue: []
      })).join('\n'),
      polyfillImports: (0, _importsToStr.default)(this.service.applyPlugins('addEntryPolyfillImports', {
        initialValue: []
      })).join('\n'),
      moduleBeforeRenderer,
      render: initialRender,
      plugins,
      validKeys
    });

    (0, _fs.writeFileSync)(paths.absLibraryJSPath, `${entryContent.trim()}\n`, 'utf-8');
  }

  generateHistory() {
    const paths = this.service.paths;
    const tpl = (0, _fs.readFileSync)(paths.defaultHistoryTplPath, 'utf-8');
    const initialHistory = `
require('umi/_createHistory').default({
  basename: window.routerBase,
})
    `.trim();

    const content = _mustache.default.render(tpl, {
      history: this.service.applyPlugins('modifyEntryHistory', {
        initialValue: initialHistory
      })
    });

    (0, _fs.writeFileSync)((0, _path.join)(paths.absTmpDirPath, 'initHistory.js'), `${content.trim()}\n`, 'utf-8');
  }

  generateRouterJS() {
    const paths = this.service.paths;
    const absRouterJSPath = paths.absRouterJSPath;
    this.RoutesManager.fetchRoutes();
    const routesContent = this.getRouterJSContent(); // 避免文件写入导致不必要的 webpack 编译

    if (this.routesContent !== routesContent) {
      (0, _fs.writeFileSync)(absRouterJSPath, `${routesContent.trim()}\n`, 'utf-8');
      this.routesContent = routesContent;
    }
  }

  getRouterJSContent() {
    const paths = this.service.paths;
    const routerTpl = (0, _fs.readFileSync)(paths.defaultRouterTplPath, 'utf-8');
    const routes = (0, _stripJSONQuote.default)(this.getRoutesJSON({
      env: process.env.NODE_ENV
    }));
    const rendererWrappers = this.service.applyPlugins('addRendererWrapperWithComponent', {
      initialValue: []
    }).map((source, index) => {
      return {
        source,
        specifier: `RendererWrapper${index}`
      };
    });
    const routerContent = this.getRouterContent(rendererWrappers);
    return _mustache.default.render(routerTpl, {
      imports: (0, _importsToStr.default)(this.service.applyPlugins('addRouterImport', {
        initialValue: rendererWrappers
      })).join('\n'),
      importsAhead: (0, _importsToStr.default)(this.service.applyPlugins('addRouterImportAhead', {
        initialValue: []
      })).join('\n'),
      routes,
      routerContent,
      RouterRootComponent: this.service.applyPlugins('modifyRouterRootComponent', {
        initialValue: 'DefaultRouter'
      })
    });
  }

  fixHtmlSuffix(routes) {
    routes.forEach(route => {
      if (route.routes) {
        route.path = `${route.path}(.html)?`;
        this.fixHtmlSuffix(route.routes);
      }
    });
  }

  getRoutesJSON(opts = {}) {
    const env = opts.env;
    return (0, _routesToJSON.default)(this.RoutesManager.routes, this.service, env);
  }

  getRouterContent(rendererWrappers) {
    const defaultRenderer = `
    <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
    `.trim();
    return rendererWrappers.reduce((memo, wrapper) => {
      return `
        <${wrapper.specifier}>
          ${memo}
        </${wrapper.specifier}>
      `.trim();
    }, defaultRenderer);
  }

}

exports.default = FilesGenerator;