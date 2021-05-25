const getFunds = require('../message/fund');

const routes = [{ keyword: '基金召唤兽', handle: getFunds }];

async function handleMessage(msg) {
  const text = msg.toString();
  if (text.includes('对韭当割')) {
    const route = routes.find(route => {
      return text.includes(route.keyword);
    });
    if (!route) return;
    const message = await route.handle();
    await msg.say(message);
  }
}
module.exports = handleMessage;
