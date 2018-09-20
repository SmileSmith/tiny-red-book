const request = require('superagent');
const log4js = require('../config/log4js');
const { microAppUA } = require('../constants/spider');

const log = log4js.getLogger('feed');

// 目标链接
const feedUrl = 'https://www.xiaohongshu.com/sapi/wx_mp_api/sns/v1/homefeed?oid=recommend&page=1&page_size=100';

async function getFeeds(oid) {
  const url = feedUrl.replace('recommend', oid || 'recommend');

  // 其中auth和auth-sign动态计算，抓包后修改
  const result = await request
    .get(url)
    .set('auth', '')
    .set('auth-sign', '')
    .set('content-type', 'application/json')
    .set('charset', 'utf-8')
    .set('Accept-Encoding', 'gzip')
    .set('Host', 'www.xiaohongshu.com')
    .set('User-Agent', microAppUA)
    .set('referer', 'https://servicewechat.com/wxffc08ac7df482a27/86/page-frame.html')
    .then((res, error) => {
      if (error) {
        // 请求出错，打印错误，返回
        log.error(error);
        return new Error(error);
      }
      return res.body.data;
    })
    .catch((error) => {
      log.error(error);
      return new Error(error);
    });
  return result;
}

module.exports = { getFeeds };
