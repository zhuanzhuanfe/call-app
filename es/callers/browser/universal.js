import "core-js/modules/es.array.concat";
var targetToPath = {
  zz: 'zhuanzhuan',
  zzseller: 'seller',
  check: 'check',
  yige: 'yige'
};
export default function (opt) {
  var __SCHEMA_PATH = opt.__SCHEMA_PATH;
  location.href = "https://mjump.zhuanzhuan.com/".concat(targetToPath[opt.targetApp], "/index.html?path=").concat(__SCHEMA_PATH);
}