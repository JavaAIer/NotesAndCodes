"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchRoutes = patchRoutes;
exports.render = render;
exports.dva = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// PluginAPI
class PluginAPI {
  constructor(service) {
    this.service = service;
  }

  addPanel(panel) {
    this.service.panels.push(panel);
  }

} // service


const service = window.g_service = {
  panels: []
};

function patchRoutes(routes) {
  service.panels.forEach(panel => {
    panel.models.forEach(model => {
      window.g_app.model(model);
    });
    routes[0].routes.unshift(_objectSpread({
      exact: true
    }, panel));
  });
}

function render(oldRender) {
  Object.keys(window.g_umiUIPlugins).forEach(key => {
    (window.g_umiUIPlugins[key].default || window.g_umiUIPlugins[key])(new PluginAPI(service));
  });
  oldRender();
}

const dva = {
  config: {
    initialState: {
      service: window.g_service
    }
  }
};
exports.dva = dva;