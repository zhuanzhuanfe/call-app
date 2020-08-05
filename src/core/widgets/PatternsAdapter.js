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
import { SchemaMap } from '../../libs/config'
import { regTest } from '../../libs/utils'

export default class PatternsAdapter {
  constructor(opts) {
    this.opts = opts
  }
  __getSchema({ openType = '', id = '' }) {
    if (!openType) {
      return SchemaMap.home.path
    }
    const queryStr =
      (id &&
        (!regTest({ str: SchemaMap[openType].path, reg: /\?/g }) && '?') +
          `${SchemaMap[openType].params.id}=${encodeURIComponent(id)}`) ||
      ''
    return `${SchemaMap[openType].path}${queryStr}`
  }
  wrap() {
    const path = this.opts.path || this.__getSchema(this.opts.urlSearch || {})
    this.opts.__SCHEMA_PATH =
      (regTest({
        reg: /^((zzcheck:\/\/)|(zhuanzhuan:\/\/)|(zhuanzhuanseller:\/\/))/g,
        str: path,
      }) &&
        path) ||
      `zhuanzhuan://${path}`
    return this.opts
  }
}
