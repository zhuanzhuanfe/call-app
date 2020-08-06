export default function (opt) {
  const { __SCHEMA_PATH } = opt
  location.href = `https://mjump.zhuanzhuan.com/zhuanzhuan/index.html?path=${__SCHEMA_PATH}`
}
