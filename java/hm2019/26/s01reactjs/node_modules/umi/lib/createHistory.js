import createHistory from 'history/createBrowserHistory';
import { normalizePath } from './utils';
export default function (opts) {
  var history = createHistory(opts);

  if (__UMI_HTML_SUFFIX) {
    var oldPush = history.push;
    var oldReplace = history.replace;

    history.push = function (path, state) {
      oldPush(normalizePath(path), state);
    };

    history.replace = function (path, state) {
      oldReplace(normalizePath(path), state);
    };
  }

  return history;
}