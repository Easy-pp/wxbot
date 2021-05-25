const fundClock = require('./clock');

async function schedule(bot) {
  await fundClock(bot);
}

module.exports = schedule;
