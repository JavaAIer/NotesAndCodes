function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import 'whatwg-fetch';
import guessJSFileFromPath from './guessJSFileFromPath';
import styles from './NotFound.less';

var NotFound =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NotFound, _React$Component);

  function NotFound(props) {
    var _this;

    _classCallCheck(this, NotFound);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NotFound).call(this, props));
    _this.state = {
      loading: true,
      routes: []
    };
    return _this;
  }

  _createClass(NotFound, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch('/__umiDev/routes').then(function (res) {
        return res.json();
      }).then(function (routes) {
        _this2.setState({
          loading: false,
          routes: routes
        });
      });
    }
  }, {
    key: "renderRoutes",
    value: function renderRoutes(routes) {
      var _this3 = this;

      return React.createElement("ul", null, routes.map(function (route, i) {
        if (!route.path) return null;
        return React.createElement("li", {
          key: route.key || i
        }, React.createElement(Link, {
          to: route.path
        }, route.path), route.routes ? _this3.renderRoutes(route.routes) : null);
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          location = _this$props.location,
          pagesPath = _this$props.pagesPath,
          hasRoutesInConfig = _this$props.hasRoutesInConfig;
      var jsFile = guessJSFileFromPath(location.pathname);
      return React.createElement("div", {
        className: styles['umi-NotFound-wrapper']
      }, React.createElement("h1", null, "umi development 404 page"), React.createElement("p", null, "There's not a page yet at ", React.createElement("code", null, location.pathname), "."), React.createElement("p", null, "Create a React.js component in your pages directory at", ' ', React.createElement("code", null, pagesPath, "/", jsFile), ' ', hasRoutesInConfig ? "and configure the route in config file " : '', "then this page will automatically refresh to show the new page component you created."), React.createElement("h2", null, "Your Routes"), this.state.loading ? React.createElement("div", null, "Loading routes...") : this.renderRoutes(this.state.routes));
    }
  }]);

  return NotFound;
}(React.Component);

export default withRouter(NotFound);