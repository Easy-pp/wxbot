const { CronJob } = require('cron');
const getFunds = require('../message/fund');

async function fundClock(bot) {
  return new CronJob(
    '01 30 14 * * 1-5',
    async () => {
      const rooms = await bot.Room.findAll({ topic: /对韭当割/ });
      const message = await getFunds();
      for (const room of rooms) {
        await room.say(message);
      }
    },
    null,
    true,
    'Asia/Shanghai'
  );
}
module.exports = fundClock;
