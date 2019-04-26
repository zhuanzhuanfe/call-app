import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
/**
 * Created by luyunhai on 2018/11/9.
 * 适配传统的吊起方式, 客户端后期将不会兼容openType的方式, 统一通过'zhuanzhuan://'的统跳形式拉起
 * (ps: 特殊客户端类似58App, 会采用schema和sdk结合的方式拉起App)
 *
 * 以前的入参:
 * 一个参数 { openType } :
 *      首页: { openType: 'home' }
 *      消息tab页: { openType: 'messagecenter' }
 *      我买到的: { openType: 'mybuy' }
 *      发布页: { openType: 'publish' }
 * 两个参数 { openType, id } :
 *      详情页: { openType: 'detail', id: 'infoId' }
 *      我卖出的: { openType: 'mysell', id: '' }
 *      订单详情页: { openType: 'order', id: 'orderId' }
 *      个人主页: { openType: 'person', id: 'userId' }
 *      小区页: { openType: 'village', id: 'villageId' }
 *      M页: { openType: 'web', id: 'url' }
 */
import { SchemaMap } from '../../libs/config';
import { regTest } from '../../libs/utils';

var PatternsAdapter = function () {
    function PatternsAdapter(opts) {
        _classCallCheck(this, PatternsAdapter);

        this.opts = opts;
    }

    _createClass(PatternsAdapter, [{
        key: '__getSchema',
        value: function __getSchema(_ref) {
            var _ref$openType = _ref.openType,
                openType = _ref$openType === undefined ? '' : _ref$openType,
                _ref$id = _ref.id,
                id = _ref$id === undefined ? '' : _ref$id;

            if (!openType) {
                return SchemaMap.home.path;
            }
            var queryStr = id && (!regTest({ str: SchemaMap[openType].path, reg: /\?/g }) && '?') + (SchemaMap[openType].params.id + '=' + encodeURIComponent(id)) || '';
            return '' + SchemaMap[openType].path + queryStr;
        }
    }, {
        key: 'wrap',
        value: function wrap() {
            var path = this.opts.path || this.__getSchema(this.opts.urlSearch || {});
            this.opts.__SCHEMA_PATH = regTest({ reg: /^((zzcheck\:\/\/)|(zhuanzhuan\:\/\/)|(zhuanzhuanseller\:\/\/))/g, str: path }) && path || 'zhuanzhuan://' + path;
            return this.opts;
        }
    }]);

    return PatternsAdapter;
}();

export default PatternsAdapter;