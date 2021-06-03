const fundClock = require("./clock");
const drinkTea = require("./drinkTea");
async function schedule(bot) {
	await fundClock(bot);
	drinkTea(bot);
}

module.exports = schedule;
