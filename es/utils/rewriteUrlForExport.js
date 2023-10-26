export function rewriteUrlForNextExport(url) {
    var _a = url.split('#'), pathname = _a[0], hash = _a[1];
    var _b = pathname.split('?'), path = _b[0], qs = _b[1];
    if (path) {
        path = path.replace(/\/$/, '');
        if (!/\.[^/]+\/?$/.test(path))
            path += '/';
    }
    if (typeof qs === 'string')
        path += '?' + qs;
    if (typeof hash === 'string')
        path += '#' + hash;
    return path;
}
