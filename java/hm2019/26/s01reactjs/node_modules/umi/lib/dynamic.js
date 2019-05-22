function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import React from 'react';
import Loadable from 'react-loadable'; // Thanks to next.js
// ref: https://github.com/zeit/next.js/blob/canary/lib/dynamic.js

export default function (dynamicOptions, options) {
  var loadableFn = Loadable;
  var loadableOptions = {
    loading: function loading(_ref) {
      var error = _ref.error,
          isLoading = _ref.isLoading;

      if (process.env.NODE_ENV === 'development') {
        if (isLoading) {
          return React.createElement("p", null, "loading...");
        }

        if (error) {
          return React.createElement("p", null, error.message, React.createElement("br", null), error.stack);
        }
      }

      return React.createElement("p", null, "loading...");
    }
  }; // Support for direct import(),
  // eg: dynamic(import('../hello-world'))

  if (typeof dynamicOptions.then === 'function') {
    loadableOptions.loader = function () {
      return dynamicOptions;
    }; // Support for having first argument being options,
    // eg: dynamic({loader: import('../hello-world')})

  } else if (_typeof(dynamicOptions) === 'object') {
    loadableOptions = _objectSpread({}, loadableOptions, dynamicOptions);
  } // Support for passing options,
  // eg: dynamic(import('../hello-world'), {loading: () => <p>Loading something</p>})


  loadableOptions = _objectSpread({}, loadableOptions, options); // Support for `render` when using a mapping,
  // eg: `dynamic({ modules: () => {return {HelloWorld: import('../hello-world')}, render(props, loaded) {} } })

  if (dynamicOptions.render) {
    loadableOptions.render = function (loaded, props) {
      return dynamicOptions.render(props, loaded);
    };
  } // Support for `modules` when using a mapping,
  // eg: `dynamic({ modules: () => {return {HelloWorld: import('../hello-world')}, render(props, loaded) {} } })


  if (dynamicOptions.modules) {
    loadableFn = Loadable.Map;
    var loadModules = {};
    var modules = dynamicOptions.modules();
    Object.keys(modules).forEach(function (key) {
      var value = modules[key];

      if (typeof value.then === 'function') {
        loadModules[key] = function () {
          return value.then(function (mod) {
            return mod.default || mod;
          });
        };

        return;
      }

      loadModules[key] = value;
    });
    loadableOptions.loader = loadModules;
  }

  return loadableFn(loadableOptions);
}