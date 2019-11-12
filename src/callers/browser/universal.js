export default function (opt) {
  const { __SCHEMA_PATH } = opt;
  let path = /^(zzcheck)/.test(__SCHEMA_PATH)
    ? 'check'
    : /^(zhuanzhuanseller)/.test(__SCHEMA_PATH)
      ? 'seller'
      : 'zhuanzhuan';

  location.href = `https://mjump.zhuanzhuan.com/${path}/index.html?path=${__SCHEMA_PATH}`
}