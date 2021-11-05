// const { CronJob } = require('cron');
const lib = require("../lib");
const common = require("../common/index");
const config = require("../wechat.config.js");

// async function fundClock(bot) {
//     return new CronJob(
//         '01 30 14 * * 1-5',
//         async () => {
//             const rooms = await bot.Room.findAll({ topic: /对韭当割/ });
//             const message = await getFunds();
//             for (const room of rooms) {
//                 await room.say(message);
//             }
//         },
//         null,
//         true,
//         'Asia/Shanghai'
//     );
// }

/**
 * 每日说定时任务设定，针对好友
 * @param {*} bot bot对象
 * @param {*} item 任务项
 */
async function setEveryDayTask(bot, item) {
    try {
        const { date: time, isRoom } = item;
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
                `查找不到用户昵称为'${item.name}'或备注为'${item.alias}'的用户，请检查设置用户是否正确`
            );
            return;
        } else {
            console.log(`设置用户：“${item.name || item.alias}”每日说任务成功`);
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
