const getFunds = require("../message/fund");
const getAIAns = require("../message/AI-Tencent");
const { getSelfName } = require("../lib");
const {
  PANG_CODE,
  fundCodes,
  fundCodesOfYang,
  fundCodesOfRan,
  fundCodesOfHERO,
  fundCodesOfWatch,
  funCodesOfAll,
} = require("../const/fund");

const routes = [
  { keyword: "召唤兽", handle: () => getFunds(fundCodes) },
  { keyword: "小胖", handle: () => getFunds(PANG_CODE) },
  { keyword: "漾", handle: () => getFunds(fundCodesOfYang) },
  { keyword: "然", handle: () => getFunds(fundCodesOfRan) },
  { keyword: "观察", handle: () => getFunds(fundCodesOfWatch) },
  { keyword: "HERO", handle: () => getFunds(fundCodesOfHERO) },
  { keyword: "所有人", handle: () => getFunds(funCodesOfAll) },
];
const roomList = ["对韭当割", "测试", "一灯韭菜抱团取暖开车群"];
async function handleMessage(msg) {
  const text = msg.text();
  const contact = msg.from();
  const room = msg.room();
  const atSelf = text.includes(`@${getSelfName()}`);
  if (!room) return;
  const topic = await room.topic();
  console.log(`Room: ${topic} Contact: ${contact.name()} Text: ${text}`);
  if (roomList.includes(topic)) {
    let route = null;
    let cleanText = text
      .replace(new RegExp(`@${getSelfName()}`, "g"), "")
      .trim();
    if (text.includes("基金")) {
      route = routes.find((route) => {
        return cleanText.includes(route.keyword);
      });
    }
    let handle = route ? route.handle : null;
    if (handle && topic === "对韭当割" && !atSelf) {
      handle = null;
    }
    if (!handle && !atSelf) return;
    if (!handle && atSelf) {
      handle = getAIAns;
    }
    let params = {
      room: topic,
      contact,
      text,
    };
    const message = await handle(params);
    await msg.say(message);
  }
}
module.exports = handleMessage;
