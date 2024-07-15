const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 10101;

const proxyOptions = {
  target: 'http://example.com', // 目标服务器地址
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // 如果请求路径以 /api 开头，则重写为空，否则保持不变
  },
};

app.use(createProxyMiddleware(proxyOptions));

app.listen(port, () => {
  console.log(`Proxy server is running at http://localhost:${port}`);
});
