"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifyRoutes = modifyRoutes;
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _assert = _interopRequireDefault(require("assert"));

var _mustache = _interopRequireDefault(require("mustache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (api, option) => {
  const paths = api.paths,
        config = api.config;
  const wrapperPath = (0, _path.join)(paths.absTmpDirPath, './TitleWrapper.jsx');
  api.onGenerateFiles(() => {
    writeTitleWrapper(wrapperPath, option.useLocale, option);
  });
  api.onOptionChange(newOption => {
    option = newOption;
    api.rebuildTmpFiles();
    api.rebuildHTML();
  });
  api.modifyHTMLContext((memo, {
    route
  }) => {
    if (option) {
      const _parseOption = parseOption(option),
            defaultTitle = _parseOption.defaultTitle;

      return _objectSpread({}, memo, {
        title: config.exportStatic ? route._title : defaultTitle
      });
    }

    return memo;
  });
  api.modifyRoutes(memo => {
    return modifyRoutes(memo, option);
  });
  api.onPatchRoute(({
    route
  }) => {
    if (option && (!route.routes || !route.routes.length) && route.title) {
      // only open this plugin when option exist
      route.Routes = [...(route.Routes || []), (0, _path.relative)(paths.cwd, wrapperPath)];
    }
  });
};

exports.default = _default;

function writeTitleWrapper(targetPath, useLocale, option) {
  const wrapperTpl = (0, _fs.readFileSync)((0, _path.join)(__dirname, './template/TitleWrapper.js.tpl'), 'utf-8');

  const wrapperContent = _mustache.default.render(wrapperTpl, {
    useLocale,
    option
  });

  (0, _fs.writeFileSync)(targetPath, wrapperContent, 'utf-8');
}

function parseOption(option) {
  // fill title with parent value or default value
  let defaultTitle = option;
  let format = '{parent}{separator}{current}';
  let separator = ' - ';

  if (typeof option === 'object') {
    defaultTitle = option.defaultTitle;
    (0, _assert.default)(defaultTitle, 'defaultTitle in title option is required.');
    format = option.format || format;
    separator = option.separator || separator;
  }

  return {
    defaultTitle,
    format,
    separator
  };
}

function modifyRoutes(memo, option) {
  if (option) {
    const _parseOption2 = parseOption(option),
          defaultTitle = _parseOption2.defaultTitle,
          format = _parseOption2.format,
          separator = _parseOption2.separator;

    setDefaultTitleToRoutes({
      routes: memo,
      defaultTitle,
      format,
      separator,
      globalDefaultTitle: defaultTitle
    });
  }

  return memo;
}

function setDefaultTitleToRoutes({
  routes,
  defaultTitle,
  parentTitle,
  format,
  separator,
  globalDefaultTitle
}) {
  routes.forEach(route => {
    if (route.title) {
      route._title = format.replace(/\{current\}/g, route.title).replace(/\{parent\}/g, parentTitle || '').replace(/\{separator\}/g, parentTitle ? separator : '');
    } else {
      // title no exist, use the defaultTitle
      route._title = defaultTitle;
    }

    route._title_default = globalDefaultTitle;

    if (route.routes) {
      setDefaultTitleToRoutes({
        routes: route.routes,
        defaultTitle: route._title,
        // title exist, set new parentTitle for children routes
        parentTitle: route.title || parentTitle,
        format,
        separator,
        globalDefaultTitle
      });
    }
  });
} // for unit test