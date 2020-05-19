const JSZip = require('jszip');
const path = require('path');
const RawSource = require('webpack-sources').RawSource;
const zip = new JSZip();

module.exports = class ZipPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    // 监听emit这个钩子
    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      // 生成zip包
      const folder = zip.folder(this.options.filename);

      for (let filename in compilation.assets) {
        const source = compilation.assets[filename].source();
        folder.file(filename, source);
      }

      zip.generateAsync({
        type: 'nodebuffer'
      }).then((content) => {
        // 回调：将zip包输出
        const outputPath = path.join(
          compilation.options.output.path,
          this.options.filename + '.zip'
        );
        
        const outputRelativePath = path.relative(
          compilation.options.output.path,
          outputPath
        );
        // 添加到compilation的assets对象上就可以输出了
        compilation.assets[outputRelativePath] = new RawSource(content);

        callback();
      });
    });
  }
}