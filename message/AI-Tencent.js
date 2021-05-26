const qs = require("qs");
const axios = require("axios");
const api = require("../proxy/api");
const DEFAULT_CONFIG = {
	APPID: "2173834995",
	APPKEY: "5row6NAxKhre7XUc",
};

function objKeySort(arys) {
	//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
	var newkey = Object.keys(arys).sort();
	//console.log('newkey='+newkey);
	var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
	for (var i = 0; i < newkey.length; i++) {
		//遍历newkey数组
		newObj[newkey[i]] = arys[newkey[i]];
		//向新创建的对象中按照排好的顺序依次增加键值对
	}
	return newObj; //返回排好序的新对象
}
// getReqSign ：根据 接口请求参数 和 应用密钥 计算 请求签名
// 参数说明
//   - $params：接口请求参数（特别注意：不同的接口，参数对一般不一样，请以具体接口要求为准）
//   - $appkey：应用密钥
// 返回数据
//   - 签名结果
function getReqSign(params /* 关联数组 */, appkey /* 字符串*/) {
	let ksort = objKeySort(params);
	ksort = { ...ksort, app_key: appkey };
	const str = qs.stringify(ksort);
	console.log(str);
	const sign = md5(str).toUpperCase();
	return sign;
}

function randomString(length) {
	var str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var result = "";
	for (var i = length; i > 0; --i)
		result += str[Math.floor(Math.random() * str.length)];
	return result;
}
async function sendMessage(msgInfo) {
	const { text, room, contact } = msgInfo;
	const { APPID, APPKEY } = DEFAULT_CONFIG;
	const question = text.replace(/@基金小助手/g, "").trim();
	if (!question) return "请问有什么需要帮助的吗";
	// const id = api.getUniqueId(`${room}_${contact}`);
	// const result = await api.getResByTX(question, id);
	// return result;
	const params = {
		app_id: APPID,
		time_stamp: Date.parse(new Date()) / 1000,
		nonce_str: randomString(10),
		session: `${room}`,
		question,
	};
	params.sign = getReqSign(params, APPKEY);
	const newParams = qs.stringify(params);
	const url = `https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat?${newParams}`;

	return axios
		.get(url)
		.then((res) => {
			console.log(res);
			const { data } = res;
			if (data.ret === 0) return data.data.answer;
			return "很抱歉,这个问题我还需要学习下";
		})
		.catch(() => {
			return "啊，脑子有点短路了";
		});
}

module.exports = sendMessage;
