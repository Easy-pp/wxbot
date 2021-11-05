const lib = require("../lib");
const common = require("../common/index");
const config = require("../wechat.config.js");

/**
 * 每日说定时任务设定，针对好友
 * @param {*} bot bot对象
 * @param {*} item 任务项
 */
async function setEveryDayTask(bot, item) {
    try {
        const { date: time, isRoom } = item;
        const name = isRoom ? '群' : '用户';
        let contact;
        if (isRoom) {
            contact = await bot.Room.find({ topic: item.name }); // 获取你要发送的群组
        } else {
            contact =
                (await bot.Contact.find({ alias: item.alias })) ||
                (await bot.Contact.find({ name: item.name })); // 获取你要发送的联系人
        }
        if (!contact) {
            console.log(
                `查找不到${name}昵称为'${item.name}'或备注为'${item.alias}'的${name}，请检查设置 name 是否正确`
            );
            return;
        } else {
            console.log(`${name}：“${item.name || item.alias}” 设置每日说任务成功`);
            lib.setSchedule(time, async () => {
                let content = await common.getEveryDayContent(
                    item.memorialDay,
                    item.city,
                    item.endWord
                );
                console.log("每日说任务开始工作,发送内容：", content);
                lib.delay(10000);
                await contact.say(content);
            });
        }
    } catch (error) {
        console.log("每日说任务设置失败", error);
    }
}

const useEveryDay = async (bot, list = config.DAYLIST) => {
    if (!Array.isArray(list)) return;
    for (let room of list) {
        setEveryDayTask(bot, room);
    }
}

module.exports = useEveryDay;
