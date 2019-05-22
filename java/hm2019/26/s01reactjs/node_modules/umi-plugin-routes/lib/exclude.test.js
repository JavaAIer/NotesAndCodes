"use strict";

var _exclude = _interopRequireDefault(require("./exclude"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('umi-plugin-routes:exclude', () => {
  it('function', () => {
    expect((0, _exclude.default)([{
      foo: 1
    }, {
      bar: 1
    }], [route => {
      return 'foo' in route;
    }])).toEqual([{
      bar: 1
    }]);
  });
  it('regexp', () => {
    expect((0, _exclude.default)([{
      component: 'a'
    }, {
      component: 'b'
    }, {
      component: 'c'
    }], [/a|b/])).toEqual([{
      component: 'c'
    }]);
  });
  it('regexp (ignore arrow function)', () => {
    expect((0, _exclude.default)([{
      component: '() => a'
    }, {
      component: 'b'
    }, {
      component: 'c'
    }], [/a|b/])).toEqual([{
      component: '() => a'
    }, {
      component: 'c'
    }]);
  });
  it('support nested routes', () => {
    expect((0, _exclude.default)([{
      foo: 1
    }, {
      bar: 1,
      routes: [{
        foo: 1
      }, {
        bar: 1
      }]
    }], [route => {
      return 'foo' in route;
    }])).toEqual([{
      bar: 1,
      routes: [{
        bar: 1
      }]
    }]);
  });
});