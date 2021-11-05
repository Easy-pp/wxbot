const api = require("../proxy/api");
const lib = require("../lib");
const common = require("../common/index");
const config = require("../wechat.config.js");
const schedule = require("../schedule/index");

/**
 * 每日新闻资讯，针对群
 * @param {*} that bot对象
 * @param {*} item 任务项
 */
async function setEveryDayRoomSayTask(that, item) {
  try {
    let time = item.date;
    let room = await that.Room.find({ topic: item.roomName });
    if (!room) {
      console.log(`查找不到群：${item.roomName}，请检查群名是否正确`);
      return;
    } else {
      console.log(`群：“${item.roomName}”设置资讯任务成功`);
      lib.setSchedule(time, async () => {
        let content = await common.getEveryDayRoomContent(
          item.sortId,
          item.endWord
        );
        console.log("新闻咨询开始发送，内容：", content);
        lib.delay(10000);
        await room.say(content);
      });
    }
  } catch (error) {
    console.log("设置群定时任务失败：", error);
  }
}

/**
 * 设置定时任务
 * @param {*} that bot 对象
 * @param {*} item 定时任务项
 * @deprecated
 */
async function setScheduleTask(that, item) {
  let time = item.isLoop ? item.time : new Date(item.time);
  lib.setSchedule(time, async () => {
    try {
      let contact = await that.Contact.find({ name: item.subscribe });
      console.log(`${item.subscribe}的专属提醒开启啦！`);
      await contact.say(item.content);
      if (!item.isLoop) {
        await api.updateSchedule(item._id);
      }
    } catch (error) {
      console.log("设置定时任务错误", error);
    }
  });
}
/**
 * 初始化小助手任务
 * @param {*} that bot对象
 * @param {*} RoomSayList 群资讯任务列表
 */
async function initSchedule(that, RoomSayList) {
  if (RoomSayList && RoomSayList.length > 0) {
    for (let room of RoomSayList) {
      setEveryDayRoomSayTask(that, room);
    }
  }
}
/**
 * 登录成功监听事件
 * @param {*} user 登录用户
 */
async function onLogin(user) {
  global.user = user;
  console.log(`贴心小助理${user}登录了`);
  setTimeout(async () => {
    initSchedule(this, config.ROOMLIST);
    schedule(this);
  }, 4000);
}

module.exports = onLogin;
