const request = require('superagent');
const log4js = require('../config/log4js');

const log = log4js.getLogger('feed');

// 目标链接
const feedUrl = 'https://www.xiaohongshu.com/sapi/wx_mp_api/sns/v1/homefeed?oid=recommend&page=1&page_size=100';

async function getFeeds(oid) {
  const url = feedUrl.replace('recommend', oid || 'recommend');

  // 其中auth和auth-sign动态计算，抓包后修改
  const result = await request
    .get(url)
    .set('auth', 'eyJoYXNoIjoibWQ1IiwiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifQ.eyJzaWQiOiJkNDFhYjM0OC0zMGI2LTQwYmUtODNiYi01ODUwOTljODAxMWIiLCJleHBpcmUiOjE1MzcwOTk5Mzd9.O-BNOJOfL2KOh-M0xB2YNLkDuEwy8MLvRMoI6OTxEIY')
    .set('auth-sign', '75539ca3638d2d9847ee328249d583cf')
    .set('content-type', 'application/json')
    .set('charset', 'utf-8')
    .set('Accept-Encoding', 'gzip')
    .set('Host', 'www.xiaohongshu.com')
    .set(
      'User-Agent',
      'Mozilla/5.0 (Linux; Android 8.0; SM-N9500 Build/R16NW; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.143 Crosswalk/24.53.595.0 XWEB/257 MMWEBSDK/21 Mobile Safari/537.36 MicroMessenger/6.6.7.1321(0x26060739) NetType/WIFI Language/zh_CN MicroMessenger/6.6.7.1321(0x26060739) NetType/WIFI Language/zh_CN',
    )
    .set('referer', 'https://servicewechat.com/wxffc08ac7df482a27/86/page-frame.html')
    .then((res, error) => {
      if (error) {
        // 请求出错，打印错误，返回
        log.error(error);
        return new Error(error);
      }
      return res.body.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
}

module.exports = { getFeeds };
