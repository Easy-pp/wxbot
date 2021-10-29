const { Wechaty, ScanStatus, log } = require("wechaty");

const handleMessage = require("./event/message");
const onLogin = require("./event/on-login");
const schedule = require("./schedule/index");

function onScan(qrcode, status) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    require("qrcode-terminal").generate(qrcode, { small: true }); // show qrcode on console

    const qrcodeImageUrl = [
      "https://wechaty.js.org/qrcode/",
      encodeURIComponent(qrcode),
    ].join("");

    log.info(
      "StarterBot",
      "onScan: %s(%s) - %s",
      ScanStatus[status],
      status,
      qrcodeImageUrl
    );
  } else {
    log.info("StarterBot", "onScan: %s(%s)", ScanStatus[status], status);
  }
}

function onLogout(user) {
  log.info("StarterBot", "%s logout", user);
}

const options = {
  name: "wechat-bot",
  /**
   * How to set Wechaty Puppet Provider:
   *
   *  1. Specify a `puppet` option when instantiating Wechaty. (like `{ puppet: 'wechaty-puppet-padlocal' }`, see below)
   *  1. Set the `WECHATY_PUPPET` environment variable to the puppet NPM module name. (like `wechaty-puppet-padlocal`)
   *
   * You can use the following providers:
   *  - wechaty-puppet-wechat (no token required)
   *  - wechaty-puppet-padlocal (token required)
   *  - wechaty-puppet-service (token required, see: <https://wechaty.js.org/docs/puppet-services>)
   *  - etc. see: <https://github.com/wechaty/wechaty-puppet/wiki/Directory>
   */
  puppet: "wechaty-puppet-wechat",
  puppetOptions: {
    timeout: 0,
  },
};

const bot = new Wechaty(options);

bot.on("scan", onScan);
bot.on("login", onLogin);
bot.on("logout", onLogout);
bot.on("message", handleMessage);
bot.on("heartbeat", (str) => {
  // TODO: 发送心跳到远端，用来监控机器人状态
  // console.log(`test heartbeat: ${str}`);
});

bot
  .start()
  .then(() => {
    log.info("StarterBot", "Starter Bot Started.");
    schedule(bot);
  })
  .catch((e) => log.error("StarterBot", e));
