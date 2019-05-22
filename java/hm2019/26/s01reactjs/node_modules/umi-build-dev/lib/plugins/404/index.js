"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _lodash = require("lodash");

var _umiUtils = require("umi-utils");

function _default(api) {
  const _api$service = api.service,
        paths = _api$service.paths,
        config = _api$service.config;

  if (process.env.NODE_ENV === 'development') {
    api.modifyRoutes(memo => {
      const notFoundRoute = {
        component: `
() => React.createElement(require('${(0, _umiUtils.winPath)((0, _path.join)(__dirname, 'NotFound.js'))}').default, { pagesPath: '${paths.pagesPath}', hasRoutesInConfig: ${!!config.routes} })
        `.trim()
      };
      const routes = (0, _lodash.cloneDeep)(memo);

      function addNotFound(_route) {
        if (!_route.routes) {
          return;
        }

        _route.routes.forEach(_r => addNotFound(_r));

        _route.routes.push(notFoundRoute);
      }

      routes.forEach(r => addNotFound(r));
      routes.push(notFoundRoute);
      return routes;
    });
  }
}