const getFunds = require('../message/fund');

const routes = [{ keyword: '基金召唤兽', handle: getFunds }];

async function handleMessage(msg) {
  if (msg.toString().includes('对韭当割')) {
    const text = msg.toString();
    const route = routes.find(route => {
      return text.includes(route.keyword);
    });
    const message = await route.handle();
    await msg.say(message);
  }
}
module.exports = handleMessage;
