const { FileBox } = require("file-box");
// const { resolve } = require("path");
// const { readFile } = require("fs/promises");

// const fileBox2 = FileBox.fromFile("/drink.gif");
// console.log(fileBox2);

async function fn() {
  const fileBox = FileBox.fromJSON({
    name: '7124988457090141670.gif',
    boxType: 2,
    mimeType: 'image/gif',
    remoteUrl: 'http://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxgetmsgimg?&MsgID=7124988457090141670&skey=%40crypt_37da5e65_176bc4f145cdbedf3ce891302ef5ce1f&type=big',
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'identity;q=1, *;q=0',
      'Accept-Language': 'zh-CN,zh;q=0.8',
      Cookie: 'mm_lang=en; webwx_auth_ticket=CIsBELGS2ZYEGoABpDvAbHRI466PL/kyEJkY+xCbOJYR6jeMllh7bWFYvADnj6kZw8pZwJeZUtgTnjbSVq6UsOtWyg/x0p+zpDcQawQTn7zDmAJ/pOpGhFp9bYsN8255fpR6mpZ3MNWh0VuR/N5HuOmWUZpW/WdMjh0NY+Qgxzkzzjxjo/TMUkEbbVA=; login_frequency=1; wxuin=2368473388; webwx_data_ticket=gSdYrzl99jfkp8+Mu5cID18t; last_wxuin=2368473388; wxsid=NnpYIW10uV+ricik; webwxuvid=c4a55166b20778128a1f5de0393b99001779a6138c372dbb69f854cc65e98544faf2e634d1d91e0fef6db1b3f8bad6ae; MM_WX_NOTIFY_STATE=1; MM_WX_SOUND_STATE=1; wxpluginkey=1635492126',
      Host: 'wx2.qq.com',
      Range: 'bytes=0-',
      Referer: 'http://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxgetmsgimg?&MsgID=7124988457090141670&skey=%40crypt_37da5e65_176bc4f145cdbedf3ce891302ef5ce1f&type=big',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
    }
  });
  console.log(fileBox);
  fileBox.toFile('xxx.gif');
}
fn();
