const getFunds = require("../message/fund");
const getAIAns = require("../message/AI-Tencent");
const PANG_CODE = ["005312", "008282", "002168", "160222", "003095"];
const fundCodesOfYang = ["260108", "000404", "161725", "000248"];
const fundCodesOfRan = ["161725", "160222"];
const routes = [
	{ keyword: "基金召唤兽", handle: () => getFunds() },
	{ keyword: "小胖の基金", handle: () => getFunds(PANG_CODE) },
	{ keyword: "阿漾的基金", handle: () => getFunds(fundCodesOfYang) },
	{ keyword: "然子的基金", handle: () => getFunds(fundCodesOfRan) },
	{ keyword: "@基金小助手", handle: getAIAns },
];
// const roomList = ["测试"];
const roomList = ["对韭当割", "测试", "一群很哇塞的人"];
async function handleMessage(msg) {
	// const text = msg.toString();
	const text = msg.text();
	const contact = msg.from();
	const room = msg.room();
	if (!room) return;
	const topic = await room.topic();
	console.log(`Room: ${topic} Contact: ${contact.name()} Text: ${text}`);
	if (roomList.includes(topic)) {
		const route = routes.find((route) => {
			return text.includes(route.keyword);
		});
		if (!route) return;
		let params = {
			room: topic,
			contact,
			text,
		};
		const message = await route.handle(params);
		await msg.say(message);

		// const question = text.replace(/@基金小助手/g, "").trim();
		// console.log(question, topic);
		// let message = await sendMessage(question, topic);
		// await msg.say(message.answer);
	}
}
module.exports = handleMessage;
