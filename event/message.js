const getFunds = require("../message/fund");
const getAIAns = require("../message/AI-Tencent");

const routes = [
	{ keyword: "基金召唤兽", handle: getFunds },
	{ keyword: "@基金小助手", handle: getAIAns },
];
// const roomList = ["测试"];
const roomList = ["对韭当割", "测试"];
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
