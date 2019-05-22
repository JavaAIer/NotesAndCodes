"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = writeNewRoute;
exports.getNewRouteCode = getNewRouteCode;
exports.findLayoutNode = findLayoutNode;

var _fs = require("fs");

var _path = require("path");

var _esprima = require("esprima");

var _escodegen = _interopRequireDefault(require("escodegen"));

var _esquery7 = _interopRequireDefault(require("esquery"));

var _prettier = _interopRequireDefault(require("prettier"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const debug = require('debug')('umi-build-dev:writeNewRoute');
/**
 * 将路由写入路由文件
 * @param {*} newRoute 新的路由配置: { path, component, ... }
 * @param {*} configPath 配置路径
 * @param {*} absSrcPath 代码路径
 */


function writeNewRoute(newRoute, configPath, absSrcPath) {
  const _getNewRouteCode = getNewRouteCode(configPath, newRoute, absSrcPath),
        code = _getNewRouteCode.code,
        routesPath = _getNewRouteCode.routesPath;

  (0, _fs.writeFileSync)(routesPath, code, 'utf-8');
}
/**
 * 获取目标
 * @param {*} configPath
 * @param {*} newRoute
 */


function getNewRouteCode(configPath, newRoute, absSrcPath) {
  debug(configPath);
  const ast = (0, _esprima.parseModule)((0, _fs.readFileSync)(configPath, 'utf-8'), {
    attachComment: true
  }); // 查询当前配置文件是否导出 routes 属性

  const _esquery = (0, _esquery7.default)(ast, `ExportDefaultDeclaration > ObjectExpression > [key.name="routes"],\
  AssignmentExpression[left.object.name="exports"][left.property.name="routes"]` // like: exports.routes = {}
  ),
        _esquery2 = _slicedToArray(_esquery, 1),
        routes = _esquery2[0];

  if (routes) {
    const routesNode = routes.value || routes.right; // routes 配置不在当前文件, 需要 load 对应的文件  export default { routes: pageRoutes } case 1

    if (routesNode.type !== 'ArrayExpression') {
      const _esquery3 = (0, _esquery7.default)(ast, `ImportDeclaration:has([local.name="${routesNode.name}"])`),
            _esquery4 = _slicedToArray(_esquery3, 1),
            source = _esquery4[0];

      if (source) {
        const newConfigPath = getModulePath(configPath, source.source.value, absSrcPath);
        return getNewRouteCode(newConfigPath, newRoute, absSrcPath);
      }
    } else {
      // 配置在当前文件 // export default { routes: [] } case 2
      writeRouteNode(routesNode, newRoute);
    }
  } else {
    // 从其他文件导入 export default [] case 3
    const _esquery5 = (0, _esquery7.default)(ast, 'ExportDefaultDeclaration > ArrayExpression'),
          _esquery6 = _slicedToArray(_esquery5, 1),
          node = _esquery6[0];

    writeRouteNode(node, newRoute);
  }

  const code = generateCode(ast);
  debug(code, configPath);
  return {
    code,
    routesPath: configPath
  };
}
/**
 * 写入节点
 * @param {*} node 找到的节点
 * @param {*} newRoute 新的路由配置
 */


function writeRouteNode(targetNode, newRoute) {
  const _findLayoutNode = findLayoutNode(targetNode, 0, newRoute.path),
        level = _findLayoutNode.level,
        target = _findLayoutNode.target;

  debug(target);

  if (target) {
    // 如果插入到 layout, 组件地址是否正确
    const newRouteAst = (0, _esprima.parse)(`(${JSON.stringify(newRoute)})`).body[0].expression;

    if (level === 0) {
      // 如果是第一级那么插入到上面，避免被 / 覆盖
      // 后面应该做更加智能的判断，如果可能被覆盖就插入到前面。如果可能覆盖别人就插入到后面。
      target.elements.unshift(newRouteAst);
    } else {
      target.elements.push(newRouteAst);
    }
  } else {
    throw new Error('route path not found.');
  }
}
/**
 * 查找 path 是否有 layout 节点 // like: /users/settings/profile
 * 会依次查找 /users/settings /users/ /
 * @param {*} targetNode
 * @param {*} path
 */


function findLayoutNode(targetNode, level, path) {
  debug(path, targetNode);
  const index = path && path.lastIndexOf('/');

  if (index !== -1) {
    path = index === 0 ? '/' : path.slice(0, index).toLowerCase();
    let query = `[key.name="path"][value.value="${path}"] ~ [key.name="routes"] > ArrayExpression`;

    if (index !== 0) {
      // 兼容 antd pro 相对路径路由
      const relativePath = path.split('/').pop();
      query = `${query},[key.name="path"][value.value="${relativePath}"] ~ [key.name="routes"] > ArrayExpression`;
    }

    if (process.env.BIGFISH_COMPAT) {
      query = `${query},${query.replace(/\"routes\"/g, '"childRoutes"')}`;
    }

    const _esquery$query = _esquery7.default.query(targetNode, query),
          _esquery$query2 = _slicedToArray(_esquery$query, 1),
          layoutNode = _esquery$query2[0];

    if (layoutNode) {
      debug(layoutNode);
      return {
        level: level + 1,
        target: layoutNode
      };
    } else if (index === 0) {
      // 执行到 / 后跳出
      return {
        level,
        target: targetNode
      };
    } else {
      return findLayoutNode(targetNode, level + 1, path);
    }
  } else {
    return {
      level,
      target: targetNode
    };
  }
}
/**
 * 生成代码
 * @param {*} ast
 */


function generateCode(ast) {
  const newCode = _escodegen.default.generate(ast, {
    format: {
      indent: {
        style: '  '
      }
    },
    comment: true
  });

  return _prettier.default.format(newCode, {
    // format same as ant-design-pro
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
    parser: 'babylon'
  });
}
/**
 * 获取路由配置的真实路径
 * @param {*} modulePath
 */


function getModulePath(configPath, modulePath, absSrcPath) {
  // like @/route.config
  if (/^@\//.test(modulePath)) {
    modulePath = (0, _path.join)(absSrcPath, modulePath.replace(/^@\//, ''));
  } else {
    modulePath = (0, _path.join)((0, _path.dirname)(configPath), modulePath);
  }

  if (!/\.js$/.test(modulePath)) {
    modulePath = `${modulePath}.js`;
  }

  return modulePath;
}