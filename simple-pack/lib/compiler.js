
const fs = require('fs');
const path = require('path');
const { getAST, getDependencies, transform } = require('./parser');


module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  run() {
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);
    /**
     * 这里解析依赖仅解析了入口及其子依赖，对于孙子依赖等未解析
     */
    this.modules.map((_module) => {
      _module.dependencies.map((dependency) => {
        this.modules.push(this.buildModule(dependency));
      });
    });
    this.emitFiles();
  }

  buildModule(filename, isEntry) {
    let ast;
    if (isEntry) {
      ast = getAST(filename);
    } else {
      let absolutePath = path.join(process.cwd(), './src', filename);
      ast = getAST(absolutePath);
    }

    return {
      filename,
      dependencies: getDependencies(ast),
      transformCode: transform(ast)
    };
  }

  emitFiles() {
    const outputPath = path.join(this.output.path, this.output.filename);

    let modules = '{';
    this.modules.forEach(_module => {
      modules += `'${_module.filename}': function (require, module, exports) {
          ${_module.transformCode}
        },`
    });
    modules += '}';
    /**
     * 这个bundle没有提供缓存功能，所以说每次引用都会重新跑一边依赖
     * 1. 会比较耗时，效率很低，所以如果优化需要+缓存
     * 2. 这还可能导致循环依赖，缓存定义key值解决就好了
     */
    let bundle = `
      (function(modules) {
        function require(moduleId) {
          var fn = modules[moduleId];
          
          var module = { exports: {} };
          
          fn(require, module, module.exports);
          
          return module.exports;        
        }
        require('${this.entry}');
      })(${modules});`;

    fs.writeFileSync(outputPath, bundle, 'utf-8');
  }
};
