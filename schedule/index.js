const fundClock = require("./clock");
const drinkTea = require("./drinkTea");
// TODO: 所有定时器调度加入进来
async function schedule(bot) {
	// 基金定时器
	await fundClock(bot);
	// 饮茶定时器
	drinkTea(bot);
	// TODO: 资讯定时器
}

module.exports = schedule;
