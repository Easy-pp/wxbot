const { getSelfName } = require("../lib");
const MAX_LENGTH = 100;

global.message = {};

/**
 * ç®æå¤è¯»ð
 * @description å¯ä»¥å¤è¯» ãæå­ãããè¡¨æãããä»ææºä¸ä¸æ­éåçåä¸å¼ å¾ãï¼çµèå¤å¶çå¾çä¸è®¤ä¸ºæ¯åä¸å¼ å¾çï¼å¯è½éè¦è®¡ç®å¾çåç´ çmd5...
 * @param {*} roomid
 * @param {*} cb
 * @returns say
 */
const useReRead = async (msg) => {
  // 1  å¬ä¼å·é¾æ¥/ä½ç½®
  // 2  è¯­é³/åäº«çæä»¶
  // 6  emoji/img
  // 7  ææ¬/å¥½ååç/çº¢å/æ¥é¾/å¡åµï¼webä¸æ¯æå¥½ååç/å¡åµ/çº¢å
  // 15 è§é¢
  const type = msg.type(); // æ¶æ¯ç±»å
  const text = msg.text(); // æ¶æ¯
  const contact = msg.talker();
  const room = msg.room();
  const roomid = room.id;
  const name = contact.name();
  const message = global.message;

  // é²æ­¢åå§åæ¥éï¼æ­¤å¤æ¯ä¸ä¸ªéå Maxä¸º100æ¡
  if (!message[roomid]) message[roomid] = [];

  // å¤å®æ¯å¦è¶åºè®°å½ï¼ä¸è¶åºåç´æ¥è®°å½ï¼è¶åºå shift() push();
  while (message[roomid].length >= MAX_LENGTH) {
    message[roomid].shift();
  }
  // è®°å½è¯´çè¯
  message[roomid].push({
    name,
    text,
  });

  // å¤å®èªå·±æ¯ä¸æ¯è¯´è¿è¿ä¸ªæ¶æ¯ï¼è¯´è¿å°±ç»æ­¢
  const isSaid = message[roomid].find(
    (item) => item.name === getSelfName() && item.text === text
  );
  if (isSaid) return;

  // å¤å®æ¯å¦æ¯éè¦å¤è¯»çæ¶æ¯ï¼æ¯å°±å¤è¯»ï¼æå®åºç°æ¬¡æ°è¶è¿3ï¼å³ä¸ºå¤è¯»ð
  let count = 0;
  for (const item of message[roomid]) {
    if (item.text === text) count++;
    if (count >= 3) break;
  }
  if (count < 3) return;

  // let saymsg = text;
  // if ([1, 2, 6, 15].includes(type)) {
  //   saymsg = await msg.toFileBox(); // å¤åªä½æ¶æ¯
  //   console.log(saymsg);
  // }

  // åéæ¶æ¯
  // msg.say(saymsg);
  // åéæ¶æ¯æ¹ä¸ºè½¬åæ¶æ¯
  msg.forward(room);
};

module.exports = useReRead;
