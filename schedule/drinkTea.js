const { CronJob } = require("cron");
const { FileBox } = require("file-box");
// const fileBoxs = new FileBox();
console.log(FileBox.fromUrl);
async function drinkTea(bot) {
	return new CronJob(
		"01 * 17 * * 1-5",
		async () => {
			const rooms = await bot.Room.findAll({ topic: /测试二号/ });
			const fileBox1 = FileBox.fromUrl(
				"https://pic2.zhimg.com/50/v2-076be70f57a7d5280355996b2a3d788e_hd.gif?source=1940ef5c"
			);

			// const fileBox2 = FileBox.fromLocal("/drink.gif");
			console.log(rooms, fileBox1);

			for (const room of rooms) {
				await room.say(fileBox1);
			}
		},
		null,
		true,
		"Asia/Shanghai"
	);
}

module.exports = drinkTea;
