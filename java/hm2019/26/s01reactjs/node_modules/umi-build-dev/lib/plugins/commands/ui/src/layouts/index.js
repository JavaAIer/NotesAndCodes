import { connect } from 'dva';
import NavLink from 'umi/navlink';
import styles from './index.less';
export default connect(function (state) {
  return {
    service: state.service
  };
})(function (props) {
  return React.createElement("div", {
    className: styles.normal
  }, React.createElement("div", {
    className: styles.header
  }, React.createElement("img", {
    className: styles.logo,
    src: "https://gw.alipayobjects.com/zos/rmsportal/lbZMwLpvYYkvMUiqbWfd.png"
  }), "umi ui", React.createElement("sup", null, "alpha")), React.createElement("div", {
    className: styles.wrapper
  }, React.createElement("div", {
    className: styles.sidebar
  }, React.createElement("ul", null, props.service.panels.map(function (panel, i) {
    return React.createElement("li", {
      key: i
    }, React.createElement(NavLink, {
      activeClassName: styles.active,
      to: panel.path
    }, panel.title));
  }))), React.createElement("div", {
    className: styles.main
  }, props.children)));
});