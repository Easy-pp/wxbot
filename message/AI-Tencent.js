const qs = require("qs");
const axios = require("axios");
const md5 = require("md5");
const { getSelfName } = require("../lib");

async function sendMessage(msgInfo) {
  const { text, room, contact } = msgInfo;
  const question = text
    .replace(new RegExp(`@${getSelfName()}`, "g"), "")
    .trim();
  if (!question) return "请问有什么需要帮助的吗";
  const params = {
    time_stamp: Date.parse(new Date()) / 1000,
    mode: 1, // 工作模式
    uniqueid: `${room}`, // 用户唯一id
    key: "fac4fc8cc40a8ed3a40555da66f0a465",
    question,
  };

  const newParams = qs.stringify(params);
  const url = `http://api.tianapi.com/txapi/robot/index?${newParams}`;

  return axios
    .get(url)
    .then((res) => {
      const { data } = res;
      if (data.code !== 200) return "很抱歉,这个问题我还需要学习下";
      let replyItem = data.newslist.shift() || {
        reply: "很抱歉,这个问题我还需要学习下",
      };
      return replyItem.reply;
    })
    .catch((...err) => {
      console.log({ err });
      return "啊，脑子有点短路了";
    });
}
sendMessage({ text: "are you ok ", room: "dsd" });
module.exports = sendMessage;
