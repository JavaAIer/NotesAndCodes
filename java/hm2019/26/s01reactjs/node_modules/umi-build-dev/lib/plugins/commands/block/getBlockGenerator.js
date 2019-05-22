"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNameFromPkg = getNameFromPkg;
exports.dependenciesConflictCheck = dependenciesConflictCheck;
exports.getMockDependencies = getMockDependencies;
exports.parseContentToSingular = parseContentToSingular;
exports.getSingularName = getSingularName;
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _semver = _interopRequireDefault(require("semver"));

var _crequire = _interopRequireDefault(require("crequire"));

var _replaceContent = _interopRequireDefault(require("./replaceContent"));

var _constants = require("../../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const debug = require('debug')('umi-build-dev:getBlockGenerator');

function getNameFromPkg(pkg) {
  if (!pkg.name) {
    return null;
  }

  return pkg.name.split('/').pop();
}

function checkConflict(blockDeps, projectDeps) {
  const lacks = [];
  const conflicts = [];
  Object.keys(blockDeps).forEach(dep => {
    if (!projectDeps[dep]) {
      lacks.push([dep, blockDeps[dep]]);
    } else if (!_semver.default.intersects(projectDeps[dep], blockDeps[dep])) {
      conflicts.push([dep, blockDeps[dep], projectDeps[dep]]);
    }
  });
  return [lacks, conflicts];
}

function dependenciesConflictCheck(blockPkgDeps = {}, projectPkgDeps = {}, blockPkgDevDeps = {}, projectPkgAllDeps = {}) {
  const _checkConflict = checkConflict(blockPkgDeps, projectPkgDeps),
        _checkConflict2 = _slicedToArray(_checkConflict, 2),
        lacks = _checkConflict2[0],
        conflicts = _checkConflict2[1];

  const _checkConflict3 = checkConflict(blockPkgDevDeps, projectPkgAllDeps),
        _checkConflict4 = _slicedToArray(_checkConflict3, 2),
        devLacks = _checkConflict4[0],
        devConflicts = _checkConflict4[1];

  return {
    conflicts,
    lacks,
    devConflicts,
    devLacks
  };
}

function getMockDependencies(mockContent, blockPkg) {
  const allDependencies = _objectSpread({}, blockPkg.devDependencies, blockPkg.dependencies);

  const deps = {};

  try {
    (0, _crequire.default)(mockContent).forEach(item => {
      if (allDependencies[item.path]) {
        deps[item.path] = allDependencies[item.path];
      }
    });
  } catch (e) {
    debug('parse mock content failed');
    debug(e);
  }

  return deps;
}

const singularReg = new RegExp(`[\'\"](@\/|[\\.\/]+)(${_constants.SINGULAR_SENSLTIVE.join('|')})\/`, 'g');

function parseContentToSingular(content) {
  return content.replace(singularReg, (all, prefix, match) => {
    return all.replace(match, match.replace(/s$/, ''));
  });
}

function getSingularName(name) {
  if (_constants.SINGULAR_SENSLTIVE.includes(name)) {
    name = name.replace(/s$/, '');
  }

  return name;
}

var _default = api => {
  const paths = api.paths,
        Generator = api.Generator,
        config = api.config,
        applyPlugins = api.applyPlugins;
  return class BlockGenerator extends Generator {
    constructor(args, opts) {
      super(args, opts);
      this.sourcePath = opts.sourcePath;
      this.dryRun = opts.dryRun;
      this.path = opts.path;
      this.on('error', e => {
        debug(e); // handle the error for aviod throw generator default error stack
      });
    }

    writing() {
      var _this = this;

      return _asyncToGenerator(function* () {
        let targetPath = (0, _path.join)(paths.absPagesPath, _this.path);
        debug(`get targetPath ${targetPath}`);

        while ((0, _fs.existsSync)(targetPath)) {
          _this.path = (yield _this.prompt({
            type: 'input',
            name: 'path',
            message: `path ${_this.path} already exist, please input a new path for it`,
            required: true,
            default: _this.path
          })).path; // fix demo => /demo

          if (!/^\//.test(_this.path)) {
            _this.path = `/${_this.path}`;
          }

          targetPath = (0, _path.join)(paths.absPagesPath, _this.path);
          debug(`targetPath exist get new targetPath ${targetPath}`);
        }

        const blockPath = _this.path;
        applyPlugins('beforeBlockWriting', {
          args: {
            sourcePath: _this.sourcePath,
            blockPath
          }
        });

        if (_this.dryRun) {
          debug('dryRun is true, skip copy files');
          return;
        } // you can find the copy api detail in https://github.com/SBoudrias/mem-fs-editor/blob/master/lib/actions/copy.js


        debug('start copy block file to your project...');
        ['src', '@'].forEach(folder => {
          const folderPath = (0, _path.join)(_this.sourcePath, folder);
          const targetFolder = folder === 'src' ? targetPath : paths.absSrcPath;
          const options = {
            process(content, targetPath) {
              content = String(content);

              if (config.singular) {
                content = parseContentToSingular(content);
              }

              content = (0, _replaceContent.default)(content, {
                path: blockPath
              });
              return applyPlugins('_modifyBlockFile', {
                initialValue: content,
                args: {
                  blockPath,
                  targetPath
                }
              });
            }

          };

          if ((0, _fs.existsSync)(folderPath)) {
            (0, _fs.readdirSync)(folderPath).forEach(name => {
              // ignore the dot files
              if (name.charAt(0) === '.') {
                return;
              }

              const thePath = (0, _path.join)(folderPath, name);

              if ((0, _fs.statSync)(thePath).isDirectory() && config.singular) {
                // @/components/ => @/src/component/ and ./components/ => ./component etc.
                name = getSingularName(name);
              }

              const realTarget = applyPlugins('_modifyBlockTarget', {
                initialValue: (0, _path.join)(targetFolder, name),
                args: {
                  source: thePath,
                  blockPath,
                  sourceName: name
                }
              });
              debug(`copy ${thePath} to ${realTarget}`);

              _this.fs.copy(thePath, realTarget, options);
            });
          }
        });
      })();
    }

  };
};

exports.default = _default;