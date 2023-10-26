"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var locationFromUrl = function (url) {
    var _a = (0, url_1.parse)(url), hash = _a.hash, search = _a.search, pathname = _a.pathname;
    return {
        href: url,
        pathname: pathname || '',
        search: search || '',
        hash: hash || ''
    };
};
exports.default = locationFromUrl;
