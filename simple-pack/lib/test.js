const path = require('path');
const { getAST, getDependencies, transform } = require('./parser');

const ast = getAST(path.join(__dirname, '../src/index.js'))
const deps = getDependencies(ast);
const targetCode = transform(ast);
console.log(targetCode);

