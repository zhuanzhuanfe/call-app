/**
 * Created by luyunhai on 2018/11/9.
 */

/**
 * @description 判断验证字符串是否匹配正则
 * @param {Object} options - 必填项，以json形式传参
 * @param {Reg} options.reg - 必填项，正则表达式
 * @param {String} options.str - 必填项，被匹配的字符串
 * */
export const regTest = ({reg, str}) => {
    return reg.test(str);
};
