import "core-js/modules/es.array.map";
export var loadJS = function loadJS(url, cb) {
  var head = window.document.getElementsByTagName('head')[0];
  var js = window.document.createElement('script');
  js.setAttribute('type', 'text/javascript');
  js.setAttribute('async', 'async');
  js.setAttribute('src', url);
  js.onload = cb;
  head.appendChild(js);
};
export var loadJSArr = function loadJSArr(urls, cb) {
  var done = 0;
  if (typeof urls === 'string') urls = [urls];
  var _urls = urls,
      length = _urls.length;
  urls.map(function (url) {
    return loadJS(url, function () {
      ++done >= length && cb();
    });
  });
};