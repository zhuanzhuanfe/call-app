/**
 *
 *  domain/host 判断
 *
 * */

export const is58Host: boolean = /\.58\.com/.test(location.origin)

export const isZZHost: boolean =  /\.zhuanzhuan\.com/i.test(location.origin)
