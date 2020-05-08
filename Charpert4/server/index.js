if (typeof window === 'undefined') {
  global.window = {};
}

const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/search_d1cbf905.js');

const tpl = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');


const server = (port) => {
  const app = express();

  app.use(express.static('../dist'));
  app.get('/search', (req, res) => {
    const html = renderMarkup(renderToString(SSR));
    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log('server is running!');
  });
};

const renderMarkup = (str) => {
  const data = '{"error":[],"extra":[],"data":{"list":[{"live_cover":"https:\\/\\/static001.geekbang.org\\/resource\\/image\\/90\\/5e\\/90b85bc9cbbf70ed51c3003b2451e65e.jpg","live_guest":"为你总结架构师的最佳成长路径","live_position":"","id":7861,"live_title":"大厂招聘架构师，都看重哪些能力？","score":5881746496,"live_start":1586865600,"live_url":"https:\\/\\/live.geekbang.org\\/room\\/btree?utm_source=app&utm_medium=geeklive&utm_campaign=promotion&utm_content=live"}],"page":{"count":1,"more":false}},"code":0}';
  return tpl.replace('<!--HTML_PLACEHOLDER-->', str)
    .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data=${data};alert(1)</script>`);
};

server(process.env.PORT || 3000);

