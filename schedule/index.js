const fundClock = require("./clock");
const drinkTea = require("./drinkTea");
const useEveryDay = require("./useEveryDay");
const config = require("../wechat.config.js");

// TODO: 所有定时器调度加入进来
async function schedule(bot) {
	// // 基金定时器
	await fundClock(bot);
	// // 饮茶定时器
	await drinkTea(bot);
	// TODO: 资讯定时器
	
	// 每日说
	await useEveryDay(bot, config.DAYLIST);
}

module.exports = schedule;
