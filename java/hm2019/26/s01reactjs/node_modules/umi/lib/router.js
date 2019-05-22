/* global window */
export function push() {
  var _window$g_history;

  (_window$g_history = window.g_history).push.apply(_window$g_history, arguments);
}
export function replace() {
  var _window$g_history2;

  (_window$g_history2 = window.g_history).replace.apply(_window$g_history2, arguments);
}
export function go() {
  var _window$g_history3;

  (_window$g_history3 = window.g_history).go.apply(_window$g_history3, arguments);
}
export function goBack() {
  var _window$g_history4;

  (_window$g_history4 = window.g_history).goBack.apply(_window$g_history4, arguments);
}
export function goForward() {
  var _window$g_history5;

  (_window$g_history5 = window.g_history).goForward.apply(_window$g_history5, arguments);
}
export default {
  push: push,
  replace: replace,
  go: go,
  goBack: goBack,
  goForward: goForward
};