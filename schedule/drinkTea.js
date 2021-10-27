const { CronJob } = require("cron");
const { FileBox } = require("file-box");

// const options = { topic: /测试/ };
const options = {};
async function drinkTea(bot) {
  return new CronJob(
    // https://www.toolhut.cn/tools/crontab
    "01 00 15 * * 1-5", // “在下午 03:00:01, 星期一至星期五”
    async () => {
      const rooms = await bot.Room.findAll(options);
      console.log(rooms);
      const fileBox1 = FileBox.fromUrl("https://files.catbox.moe/6s5k31.png");
      //   const fileBox2 = FileBox.fromFile(resolve(__dirname, "xx.gif"));
      //   console.log(rooms, fileBox1);

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
