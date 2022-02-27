# wxbot - 小助手 - padloal

---
由于web协议被封禁，所以小助手暂时根据padlocal协议修改后再次上线
https://github.com/wechaty/wechaty/issues/2352
http://pad-local.com/

# 前置需要
前往 [pad-local](http://pad-local.com/) 申请Token

在根目录新建 `token_pad.js` 文件，内容如下：

```javascript
module.exports = "YOU_PUPPET_PADLOCAL"
```

## 启动

- npm install

- npm run start

## 更新记录

- 将 reread 功能从 say 改为 forward
- ~~修复对图片、表情、视频的file类型处理~~
- 增加 reread 功能
- 修复了定时任务（对韭当割的基金召唤兽、饮茶提醒）
- 增加了所有人的合并基金
- 小助手对包含了基金的进行字匹配
- 增加了对艾特自身的判断，原因：官方的返回一直是 false

## Wechaty 文档

- [英文文档](https://wechaty.gitbook.io/wechaty/)
- [中文文档](https://wechaty.gitbook.io/wechaty/v/zh/)

## padlocal 文档
- [padlocal 中文文档](https://github.com/wechaty/puppet-padlocal/wiki/API-%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3-(TypeScript-JavaScript))

## TODO

- [ ] 项目体系重构，并更换为TS
- [ ] 整理精简 lib
- [ ] JSON 化基金配置
- [ ] 将基金部分改为 use 函数
- [ ] 发送心跳到远端，用来监控机器人状态
- [ ] 对接监控机器人微信通知hook
- [ ] 增加 HMR ，提升开发体验



<!--
https://github.com/huan/rx-queue
发送消息：1s
修改备注：10s
添加好友:   5min
自动通过好友请求：1min
-->

<!--
import { log } from 'wechaty'
log.level('silly')
// 'silent' | 'error' | 'warn' | 'info' | 'verbose' | 'silly'
 -->
