const createProxyMiddleware = require("http-proxy-middleware");
const proxies = require('./config/proxy.config');
const {REACT_APP_AUTH_API_HOST, REACT_APP_AUTH_API_HOST_PATH} = process.env;
console.log(REACT_APP_AUTH_API_HOST, REACT_APP_AUTH_API_HOST_PATH);
const proxy = (app) => {
    Object.keys(proxies).forEach(path => {
        let apiUrl = proxies[path];
        app.use(path, createProxyMiddleware({
            target: apiUrl,
            changeOrigin: true
        }))
    })
}

module.exports = proxy;