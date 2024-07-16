"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyUrl = exports.stop = exports.start = void 0;
var follow_redirects_1 = require("follow-redirects");
var querystring_1 = require("querystring");
var url = require("url");
var stream_1 = require("stream");
var type = require("content-type");
var protocolMap = { http: follow_redirects_1.http, https: follow_redirects_1.https };
var portMap = { http: 80, https: 443 };
var refererUrl = '';
function onRequest(req, res) {
    var originUrl = url.parse(req.url);
    var qs = (0, querystring_1.parse)(originUrl.query);
    var targetUrl = qs['target'];
    if (!targetUrl) {
        targetUrl = url.resolve(refererUrl, originUrl.path);
    }
    var proxy = proxyRequest(targetUrl, res);
    if (proxy) {
        req.pipe(proxy, {
            end: true
        });
    }
}
function proxyRequest(targetUrl, res) {
    var target = url.parse(targetUrl);
    var protocol = target.protocol.slice(0, -1);
    if (protocol !== 'http' && protocol !== 'https') {
        res.statusCode = 500;
        res.end("".concat(protocol, " is not supported yet."));
        return;
    }
    var options = {
        hostname: target.hostname,
        port: target.port || portMap[protocol],
        path: target.path,
        method: 'GET'
    };
    var proxy = protocolMap[protocol].request(options, function (_res) {
        // Copy headers
        var fieldsToRemove = ['x-frame-options', 'content-security-policy'];
        Object.keys(_res.headers).forEach(function (field) {
            if (!fieldsToRemove.includes(field.toLocaleLowerCase())) {
                res.setHeader(field, _res.headers[field]);
            }
        });
        var transformed = transformBody(_res, targetUrl);
        transformed.pipe(res, {
            end: true
        });
    });
    return proxy;
}
function transformBody(res, targetUrl) {
    var rawType = res.headers['content-type'] || '';
    // Do not transform unknown content
    if (!rawType) {
        return res;
    }
    var contentType = type.parse(rawType).type;
    // Do not transform non-text content
    if (contentType.indexOf('text') === -1) {
        return res;
    }
    function replaceUrl(match, p1, p2, offset, s) {
        var prefixed = p2;
        if (!p2.startsWith('http')) {
            prefixed = url.resolve(targetUrl, p2);
        }
        prefixed = proxyUrl(prefixed);
        return "".concat(p1).concat(prefixed);
    }
    var transformer = new stream_1.Transform({
        transform: function (chunk, encoding, callback) { callback(); }
    });
    // Replace HTML img src, script src, link href
    if (contentType === 'text/html') {
        transformer = new stream_1.Transform({
            transform: function (chunk, encoding, callback) {
                var content = chunk.toString();
                // Replace <img src, <script src
                content = content.replace(/(<(?:img|script)\s+[^>]*src=['"])([^'"]+)/g, replaceUrl);
                // Replace <link href
                content = content.replace(/(<link\s+[^>]*href=['"])([^'"]+)/g, replaceUrl);
                // Remove <link integrity, <script integrity
                content = content.replace(/(<(?:link|script)\s+[^>]*)(integrity=\S+)/g, '$1');
                this.push(content);
                callback();
            }
        });
        // Assume the comming HTML is the next page to show
        refererUrl = targetUrl;
    }
    // Replace CSS url()
    else if (contentType === 'text/css') {
        transformer = new stream_1.Transform({
            transform: function (chunk, encoding, callback) {
                var content = chunk.toString();
                // replace url(xxx)
                content = content.replace(/(url\(['"]?)([^'")]+)/g, replaceUrl);
                this.push(content);
                callback();
            }
        });
    }
    return res.pipe(transformer);
}
var server;
var port;
function start() {
    port = 21707 + process.pid % 1024;
    console.log("Proxy server is starting at ".concat(port, " ."));
    server = follow_redirects_1.http.createServer(onRequest).listen(port);
}
exports.start = start;
function stop() {
    console.log("Proxy server at ".concat(port, " stopped."));
    server.close();
}
exports.stop = stop;
function proxyUrl(target) {
    return "http://localhost:".concat(port, "/?target=").concat(target ? encodeURIComponent(target) : '');
}
exports.proxyUrl = proxyUrl;
