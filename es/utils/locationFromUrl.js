import { parse } from 'url';
var locationFromUrl = function (url) {
    var _a = parse(url), hash = _a.hash, search = _a.search, pathname = _a.pathname;
    return {
        href: url,
        pathname: pathname || '',
        search: search || '',
        hash: hash || ''
    };
};
export default locationFromUrl;
