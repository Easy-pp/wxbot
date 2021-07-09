function join(s) {
  return s
    .split(/\n/)
    .filter(Boolean)
    .map((v) => String.prototype.trim.call(v));
}

const fundCodes = [
  "161725", // 招商白酒
  "110022", // 易方达消费
  "163406", // 兴全合润混合
  "110011",
  "519736",
  "005827",
  "001156",
  "004854",
  "260108",
  "001694",
  "000404",
  "000248",
  "009361",
];

const PANG_CODE = ["005312", "008282", "002168", "160222", "003095"];
const fundCodesOfYang = ["260108", "000404", "161725", "000248"];
const fundCodesOfRan = ["161725", "160222", "003095", "164906"];
const fundCodesOfHERO = [
  ...join(`
	001593
	011041
	001875
	010214
	011329
	260108
	166002
	161725
	012414
`),
];
const fundCodesOfWatch = [
  ...join(`
  515790
  159995
`),
];
const fundCodesOfJI = ["005827", "160222", "161725", "008282", "400015"];

const funCodesOfAll = [
  ...new Set([
    ...PANG_CODE,
    ...fundCodes,
    ...fundCodesOfYang,
    ...fundCodesOfRan,
    ...fundCodesOfHERO,
    ...fundCodesOfWatch,
    ...fundCodesOfJI,
  ]),
];

module.exports = {
  PANG_CODE,
  fundCodes,
  fundCodesOfYang,
  fundCodesOfRan,
  fundCodesOfHERO,
  fundCodesOfWatch,
  fundCodesOfJI,
  funCodesOfAll,
};
