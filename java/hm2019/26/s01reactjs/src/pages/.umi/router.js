import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/HelloWorld",
        "exact": true,
        "component": require('../HelloWorld.js').default
      },
      {
        "path": "/List",
        "exact": true,
        "component": require('../List.js').default
      },
      {
        "path": "/MyTabs",
        "exact": true,
        "component": require('../MyTabs.js').default
      },
      {
        "path": "/Show",
        "exact": true,
        "component": require('../Show.js').default
      },
      {
        "path": "/user/UserAdd",
        "exact": true,
        "component": require('../user/UserAdd.js').default
      },
      {
        "path": "/user/UserList",
        "exact": true,
        "component": require('../user/UserList.js').default
      },
      {
        "component": () => React.createElement(require('C:/workspace/NotesAndCodes/java/hm2019/26/s01reactjs/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('C:/workspace/NotesAndCodes/java/hm2019/26/s01reactjs/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
