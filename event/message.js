const getFunds = require("../message/fund");
const getAIAns = require("../message/AI-Tencent");
const { getSelfName } = require("../lib");
const useReRead = require("./useReRead");
const { list } = require("../const/room");
const {
  PANG_CODE,
  fundCodes,
  fundCodesOfYang,
  fundCodesOfRan,
  fundCodesOfHERO,
  fundCodesOfWatch,
  fundCodesOfJI,
  funCodesOfAll,
} = require("../const/fund");

const routes = [
  { keyword: "召唤兽", handle: () => getFunds(fundCodes) },
  { keyword: "小胖", handle: () => getFunds(PANG_CODE) },
  { keyword: "漾", handle: () => getFunds(fundCodesOfYang) },
  { keyword: "然", handle: () => getFunds(fundCodesOfRan) },
  { keyword: "观察", handle: () => getFunds(fundCodesOfWatch) },
  { keyword: "HERO", handle: () => getFunds(fundCodesOfHERO) },
  { keyword: "吉", handle: () => getFunds(fundCodesOfJI) },
  { keyword: "所有人", handle: () => getFunds(funCodesOfAll) },
];
async function handleMessage(msg) {
  const text = msg.text();
  const contact = msg.talker();
  const room = msg.room();
  const atSelf = text.includes(`@${getSelfName()}`);
  if (!room) return;
  const topic = await room.topic();
  const roomid = await room.id;
  // 复读模块
  useReRead(msg);
  console.log(`RoomID: ${roomid}`);
  console.log(`Room: ${topic} Contact: ${contact.name()} Text: ${text}`);
  // if (list.find((item) => item.id === roomid)) {
  let route = null;
  let cleanText = text.replace(new RegExp(`@${getSelfName()}`, "g"), "").trim();
  if (text.includes("基金")) {
    route = routes.find((route) => {
      return cleanText.includes(route.keyword);
    });
  }
  let handle = route ? route.handle : null;
  // const tid = list.find((item) => item.topic === "对韭当割").id;
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
  // }
}
module.exports = handleMessage;
