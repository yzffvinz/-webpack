/**
 * 1. 解析依赖
 * 2. 将代码转化为AST语法树
 * 3. 将AST语法树转化为能运行在浏览器的代码
 */

const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');

module.exports = {
  getAST: (path) => {
    const source = fs.readFileSync(path, 'utf-8');

    return babylon.parse(source, {
      sourceType: 'module'
    });
  },
  getDependencies: (ast) => {
    const dependencies = [];

    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      }
    });
    return dependencies;
  },
  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ['env']
    });
    return code;
  }
}

