"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cheerio = _interopRequireDefault(require("cheerio"));

var _HTMLGenerator = _interopRequireDefault(require("../../html/HTMLGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (service, opts = {}) => {
  const config = service.config,
        paths = service.paths,
        webpackConfig = service.webpackConfig,
        routes = service.routes;
  const chunksMap = opts.chunksMap;
  return new _HTMLGenerator.default({
    config,
    paths,
    routes,
    publicPath: webpackConfig.output.publicPath,
    chunksMap,

    modifyContext(context, opts = {}) {
      const route = opts.route;
      return service.applyPlugins('modifyHTMLContext', {
        initialValue: context,
        args: {
          route
        }
      });
    },

    modifyRouterBaseStr(str) {
      return str;
    },

    modifyPublicPathStr(str) {
      return str;
    },

    modifyChunks(memo, opts = {}) {
      const route = opts.route;
      return service.applyPlugins('modifyHTMLChunks', {
        initialValue: memo,
        args: {
          route
        }
      });
    },

    modifyMetas(memo, opts = {}) {
      const route = opts.route;
      return service.applyPlugins('addHTMLMeta', {
        initialValue: memo,
        args: {
          route
        }
      });
    },

    modifyLinks(memo, opts = {}) {
      const route = opts.route;
      return service.applyPlugins('addHTMLLink', {
        initialValue: memo,
        args: {
          route
        }
      });
    },

    modifyScripts(memo, opts = {}) {
      const route = opts.route;
      return service.applyPlugins('addHTMLScript', {
        initialValue: memo,
        args: {
          route
        }
      });
    },

    modifyStyles(memo, opts = {}) {
      const route = opts.route;
      return service.applyPlugins('addHTMLStyle', {
        initialValue: memo,
        args: {
          route
        }
      });
    },

    modifyHeadScripts(memo, opts = {}) {
      const route = opts.route;
      return service.applyPlugins('addHTMLHeadScript', {
        initialValue: memo,
        args: {
          route
        }
      });
    },

    modifyHTML(memo, opts = {}) {
      const route = opts.route,
            getChunkPath = opts.getChunkPath;

      const $ = _cheerio.default.load(memo, {
        decodeEntities: false
      });

      service.applyPlugins('modifyHTMLWithAST', {
        initialValue: $,
        args: {
          route,
          getChunkPath
        }
      });
      return $.html();
    }

  });
};

exports.default = _default;