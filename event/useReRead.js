const { selfName } = require("../const/self");
const MAX_LENGTH = 100;

global.message = {};

/**
 * 简易复读🐔
 * @param {*} roomid
 * @param {*} cb
 * @returns say
 */
const useReRead = (msg) => {
  const text = msg.text(); // 消息
  const contact = msg.talker();
  const room = msg.room();
  const roomid = room.id;
  const name = contact.name();
  const message = global.message;

  // 防止初始化报错，此处是一个队列 Max为100条
  if (!message[roomid]) message[roomid] = [];

  // 判定是否超出记录，不超出则直接记录，超出则 shift() push();
  while (message[roomid].length >= MAX_LENGTH) {
    message[roomid].shift();
  }
  // 记录说的话
  message[roomid].push({
    name,
    text,
  });

  // 判定自己是不是说过这个消息，说过就终止
  const isSaid = message[roomid].find(
    (item) => item.name === selfName && item.text === text
  );
  if (isSaid) return;

  // 判定是否是需要复读的消息，是就复读，暂定出现次数超过3，即为复读🐔
  let count = 0;
  for (const item of message[roomid]) {
    if (item.text === text) count++;
    if (count >= 3) break;
  }
  if (count < 3) return;
  // 发送消息
  msg.say(text);
};

module.exports = useReRead;
