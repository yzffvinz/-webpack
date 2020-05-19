const Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');
// /url\('(/S*)\)?__sprite'/g;

module.exports = function(source) {
  const callback = this.async();
  // url('./images/dora.jpg?__sprite');
  const imgs = source.match(/url\('(\S*)\?__sprite/g);
  const matchedImgs = [];

  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i].match(/url\('(\S*)\?__sprite/)[1];
    matchedImgs.push(path.join(process.cwd(), 'src', img));
  }

  

  Spritesmith.run({ src: matchedImgs }, (err, result) => {
    fs.writeFileSync(path.join(process.cwd(), 'dist/sprite.jpg'), result.image);
    source = source.replace(/url\('(\S*)\?__sprite'\)/g, (match) => {
      return `url('dist/sprite.jpg')`;
    });
    fs.writeFileSync(path.join(process.cwd(), 'dist/index.css'), source);
    // 正常是调用emit方法，生成文件
  });
};
