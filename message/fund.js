const axios = require("axios");

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

function getColor(n) {
  let times = n > 0 ? n >> 0 : -n >> 0;
  if (times >= 3) times = 3;
  if (times < 1) times = 1;
  return n > 0 ? "🔥".repeat(times) : "🤮".repeat(times);
}

function getDate() {
  const d = new Date();
  return `${d.getFullYear()}-${
    d.getMonth() + 1
  }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}

function formatOutput(list) {
  const filtered = list.filter((o) => o && o.name && o.rate);
  filtered.sort((a, b) => b.rate - a.rate);
  const time = getDate();
  let res = `【${time} 基金行情】\n\n`;
  res += filtered
    .map((info) => `${getColor(info.rate)}【${info.rate}%】${info.name}`)
    .join(`\n\n`);
  return res;
}

function getFund(code) {
  const urlA = `http://fundgz.1234567.com.cn/js/${code}.js?rt=1463558676006`;
  return axios
    .get(urlA)
    .then(({ data }) => {
      const o = JSON.parse(data.slice(8, -2));
      return {
        name: o.name,
        rate: o.gszzl,
        date: o.gztime,
      };
    })
    .catch(() => {
      const urlB = `http://hq.sinajs.cn/list=f_${code}`;
      return axios({
        method: "get",
        url: urlB,
      })
        .then(({ data }) => {
          const arr = data.split('"')[1].split(",");
          const name = decodeURIComponent(arr[0]);
          const todayVal = arr[1];
          const yesterdayVal = arr[3];
          const date = arr[4];
          const rate = +(
            ((todayVal - yesterdayVal) / yesterdayVal) *
            100
          ).toFixed(2);
          return { name, date, rate };
        })
        .catch(console.log);
    });
}

async function getFunds() {
  return Promise.all(fundCodes.map(getFund)).then((list) => formatOutput(list));
}

module.exports = getFunds;