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

export const IOSVersion = () => {
  let str = navigator.userAgent.toLowerCase(); 
  let ver = str.match(/cpu iphone os (.*?) like mac os/); 
  try {
      if(ver) ver = ver[1].replace(/_/g,".")
  } catch (error) {
      console.log(error)
  }
  return ver
}

export const compareVersion = (curV,reqV) => {
  if(curV && reqV){
     let arr1 = curV.split('.'),
         arr2 = reqV.split('.');
     let minLength=Math.min(arr1.length,arr2.length),
         position=0,
         diff=0;
     while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position]))==0)) {
         position ++;
     }
     diff=(diff!=0)?diff:(arr1.length-arr2.length);
     return diff>0;
  }else{
     return false;
  }
}