"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSureMaterialsTempPathExist = makeSureMaterialsTempPathExist;
exports.downloadFromGit = downloadFromGit;
exports.isGitUrl = isGitUrl;
exports.parseGitUrl = parseGitUrl;
exports.getParsedData = getParsedData;

var _path = require("path");

var _fs = require("fs");

var _child_process = require("child_process");

var _mkdirp = _interopRequireDefault(require("mkdirp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const debug = require('debug')('umi-build-dev:MaterialDownload');

function makeSureMaterialsTempPathExist(dryRun) {
  const userHome = process.env.NODE_ENV === 'test' ? '/Users/test' : require('user-home');
  const blocksTempPath = (0, _path.join)(userHome, '.umi/blocks');

  if (dryRun) {
    return blocksTempPath;
  }

  if (!(0, _fs.existsSync)(blocksTempPath)) {
    debug(`mkdir blocksTempPath ${blocksTempPath}`);

    _mkdirp.default.sync(blocksTempPath);
  }

  return blocksTempPath;
}

function downloadFromGit(url, id, branch = 'master', log, args = {}) {
  const dryRun = args.dryRun;
  const blocksTempPath = makeSureMaterialsTempPathExist(dryRun);
  const templateTmpDirPath = (0, _path.join)(blocksTempPath, id);

  if ((0, _fs.existsSync)(templateTmpDirPath)) {
    // git repo already exist, pull it
    // cd id && git pull
    log.info(`${url} exist in cache, start pull from git to update...`);

    if (dryRun) {
      log.log(`dryRun is true, skip git pull`);
    } else {
      (0, _child_process.spawnSync)('git', ['fetch'], {
        cwd: templateTmpDirPath
      });
      (0, _child_process.spawnSync)('git', ['checkout', branch], {
        cwd: templateTmpDirPath
      });
      (0, _child_process.spawnSync)('git', ['pull'], {
        cwd: templateTmpDirPath
      });
    }
  } else {
    // new git repo, clone
    // git clone url id
    log.info(`start clone code from ${url}...`);

    if (dryRun) {
      log.log(`dryRun is true, skip git clone`);
    } else {
      (0, _child_process.spawnSync)('git', ['clone', url, id, '--single-branch', '-b', branch], {
        cwd: blocksTempPath
      });
    }
  }

  log.info(`code download to ${templateTmpDirPath}`);
  return templateTmpDirPath;
} // git site url maybe like: http://gitlab.alitest-inc.com/bigfish/bigfish-blocks/tree/master/demo
// or http://gitlab.alitest-inc.com/bigfish/testblocks/tree/master
// or http://gitlab.alitest-inc.com/bigfish/testblocks
// or https://github.com/umijs/umi-blocks/tree/master/demo
// or https://github.com/alibaba/ice/tree/master/react-blocks/blocks/AbilityIntroduction


const gitSiteParser = /^(https\:\/\/|http\:\/\/|git\@)((github|gitlab)[\.\w\-]+)(\/|\:)([\w\-]+)\/([\w\-]+)(\/tree\/([\w\.\-]+)([\w\-\/]+))?(.git)?$/;

function isGitUrl(url) {
  return gitSiteParser.test(url);
}

function parseGitUrl(url) {
  // (http|s)://(host)/(group)/(name)/tree/(branch)/(path)
  const _gitSiteParser$exec = gitSiteParser.exec(url),
        _gitSiteParser$exec2 = _slicedToArray(_gitSiteParser$exec, 10),
        // eslint-disable-next-line
  all = _gitSiteParser$exec2[0],
        protocol = _gitSiteParser$exec2[1],
        host = _gitSiteParser$exec2[2],
        // eslint-disable-next-line
  site = _gitSiteParser$exec2[3],
        divide = _gitSiteParser$exec2[4],
        // : or /
  group = _gitSiteParser$exec2[5],
        name = _gitSiteParser$exec2[6],
        // eslint-disable-next-line
  allpath = _gitSiteParser$exec2[7],
        _gitSiteParser$exec2$ = _gitSiteParser$exec2[8],
        branch = _gitSiteParser$exec2$ === void 0 ? 'master' : _gitSiteParser$exec2$,
        _gitSiteParser$exec2$2 = _gitSiteParser$exec2[9],
        path = _gitSiteParser$exec2$2 === void 0 ? '/' : _gitSiteParser$exec2$2;

  return {
    repo: `${protocol}${host}${divide}${group}/${name}.git`,
    branch,
    path,
    id: `${host}/${group}/${name}` // 唯一标识一个 git 仓库

  };
}

function getParsedData(url) {
  debug(`url: ${url}`);
  let realUrl;

  if (isGitUrl(url)) {
    realUrl = url;
    debug('is git url');
  } else if (/^[\w]+[\w\-\/]*$/.test(url)) {
    realUrl = `https://github.com/umijs/umi-blocks/tree/master/${url}`;
    debug(`will use ${realUrl} as the block url`);
  } else if (/^[\.\/]/.test(url)) {
    // locale path for test
    const sourcePath = (0, _path.resolve)(process.cwd(), url);
    debug(`will use ${sourcePath} as the block url`);
    return {
      isLocal: true,
      sourcePath
    };
  } else {
    throw new Error(`${url} can't match any pattern`);
  }

  return parseGitUrl(realUrl);
}