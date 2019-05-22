"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _generateWebManifest = require("./generateWebManifest");

class WebManifestPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const _this$options = this.options,
          publicPath = _this$options.publicPath,
          srcPath = _this$options.srcPath,
          outputPath = _this$options.outputPath,
          pkgName = _this$options.pkgName; // our default manifest

    let rawManifest = {
      name: pkgName,
      short_name: pkgName,
      display: 'fullscreen',
      scope: '/',
      start_url: './?homescreen=true',
      orientation: 'portrait'
    };
    compiler.hooks.emit.tap('generate-webmanifest', compilation => {
      if (srcPath) {
        try {
          rawManifest = JSON.parse((0, _fs.readFileSync)(srcPath, 'utf8'));
        } catch (e) {
          compilation.errors.push(new Error(`Please check ${srcPath}, a WebManifest should be a valid JSON file.`));
          return;
        }
      }

      rawManifest.icons && rawManifest.icons.forEach(icon => {
        icon.src = (0, _generateWebManifest.prependPublicPath)(publicPath, icon.src);
      }); // write manifest & pwacompat.js to filesystem

      [{
        path: outputPath,
        content: JSON.stringify(rawManifest)
      }, {
        path: _generateWebManifest.PWACOMPAT_PATH,
        content: (0, _fs.readFileSync)((0, _path.join)(__dirname, _generateWebManifest.PWACOMPAT_PATH))
      }].forEach(({
        path,
        content
      }) => {
        compilation.assets[path] = {
          source: () => content,
          size: () => content.length
        };
      });
    });
  }

}

exports.default = WebManifestPlugin;