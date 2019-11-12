import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
/**
 * Created by luyunhai on 2018/11/8.
 */
import BaseCaller from '../../core/base';

var QQCaller = function (_BaseCaller) {
  _inherits(QQCaller, _BaseCaller);

  function QQCaller() {
    _classCallCheck(this, QQCaller);

    return _possibleConstructorReturn(this, (QQCaller.__proto__ || _Object$getPrototypeOf(QQCaller)).apply(this, arguments));
  }

  _createClass(QQCaller, [{
    key: 'init',
    value: function init() {}
  }, {
    key: '__openApp',
    value: function __openApp(options) {
      if (this.config.device.isIOS) {
        var a = document.createElement('a');
        a.setAttribute('href', options.__SCHEMA_PATH);
        return a.click();
      }
      location.href = options.__SCHEMA_PATH;
    }
  }, {
    key: '__tryLaunch',
    value: function __tryLaunch(options) {
      var _this2 = this;

      this.__openApp(options);
      var startTime = Date.now();
      var downloadTimer = setTimeout(function () {
        _this2.__download(options);
      }, options.delay);
      if (this.config.device.isAndroid) {
        setTimeout(function () {
          var endTime = Date.now();
          var timeLimit = _this2.config.device.isAndroid ? 800 : 610;
          if (startTime && endTime - startTime > timeLimit) {
            clearTimeout(downloadTimer);
          }
        }, 600);
      }
    }
  }, {
    key: 'launch',
    value: function launch(opts) {
      var options = _get(QQCaller.prototype.__proto__ || _Object$getPrototypeOf(QQCaller.prototype), 'adaptOptions', this).call(this, opts);
      this.__tryLaunch(options);
    }
  }]);

  return QQCaller;
}(BaseCaller);

export default QQCaller;