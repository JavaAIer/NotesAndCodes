"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.update = update;

var _fs = require("fs");

var parser = _interopRequireWildcard(require("@babel/parser"));

var _traverse = _interopRequireDefault(require("@babel/traverse"));

var _generator = _interopRequireDefault(require("@babel/generator"));

var _template = _interopRequireDefault(require("@babel/template"));

var t = _interopRequireWildcard(require("@babel/types"));

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _default({
  key,
  value,
  file
}) {
  const newContent = update({
    key,
    value,
    content: (0, _fs.readFileSync)(file, 'utf-8')
  });
  (0, _fs.writeFileSync)(file, `${newContent}\n`, 'utf-8');
}

function buildExpression(str) {
  if (str.startsWith('{')) {// do nothing
  } else if (str === 'true' || str === 'false') {// do nothing
  } else {
    str = `'${str}'`;
  }

  return (0, _template.default)(`(${str})`)().expression;
}

function update({
  key,
  value,
  content
}) {
  const ast = parser.parse(content, {
    sourceType: 'module'
  });
  (0, _traverse.default)(ast, {
    ExportDefaultDeclaration(path) {
      (0, _assert.default)(t.isObjectExpression(path.node.declaration), `config file must export default a Plain Object`);

      if (t.isObjectExpression(path.node.declaration)) {
        const properties = path.node.declaration.properties;
        let hasFound;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            const property = _step.value;

            if (t.isIdentifier(property.key, {
              name: key
            })) {
              property.value = buildExpression(value);
              hasFound = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (!hasFound) {
          properties.push(t.objectProperty(t.identifier(key), buildExpression(value)));
        }
      }
    }

  });
  return (0, _generator.default)(ast, {}).code;
}