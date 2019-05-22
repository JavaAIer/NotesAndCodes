export default function (pathname) {
  var ret = null;
  pathname = pathname.replace(/\.html?$/, '');

  if (pathname.slice(-1) === '/') {
    ret = "".concat(pathname.slice(0, -1), "/index.js");
  } else {
    ret = "".concat(pathname, ".js");
  } // strip the start slash


  ret = ret.slice(1);
  return ret;
}