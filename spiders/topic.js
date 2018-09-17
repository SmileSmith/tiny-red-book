const request = require('superagent');
const log4js = require('../config/log4js');

const log = log4js.getLogger('topic');

const topicUrl = 'https://www.xiaohongshu.com/web_api/sns/v2/page/$topicId/header';
const relatedUrl = 'https://www.xiaohongshu.com/web_api/sns/v1/page/$topicId/topic/related?page_index=1&page_size=100&page_type=topic';
const feedUrl = 'https://www.xiaohongshu.com/web_api/sns/v1/page/$topicId/notes?page=1&page_size=100';

async function getTopic(topicId) {
  const result = await request
    .get(topicUrl.replace('$topicId', topicId))
    .set('Host', 'www.xiaohongshu.com')
    .set(
      'User-Agent',
      'Mozilla/5.0 (Linux; Android 8.0; SM-N9500 Build/R16NW; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.143 Crosswalk/24.53.595.0 XWEB/257 MMWEBSDK/21 Mobile Safari/537.36 MicroMessenger/6.6.7.1321(0x26060739) NetType/WIFI Language/zh_CN MicroMessenger/6.6.7.1321(0x26060739) NetType/WIFI Language/zh_CN',
    )
    .set('referer', 'https://www.xiaohongshu.com')
    .then((res, error) => {
      if (error) {
        // 请求出错，打印错误，返回
        log.error(error);
        return new Error(error);
      }
      return res.body.data;
    });

  return result;
}

async function getRelated(topicId) {
  const result = await request
    .get(relatedUrl.replace('$topicId', topicId))
    .set('Host', 'www.xiaohongshu.com')
    .set(
      'User-Agent',
      'Mozilla/5.0 (Linux; Android 8.0; SM-N9500 Build/R16NW; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.143 Crosswalk/24.53.595.0 XWEB/257 MMWEBSDK/21 Mobile Safari/537.36 MicroMessenger/6.6.7.1321(0x26060739) NetType/WIFI Language/zh_CN MicroMessenger/6.6.7.1321(0x26060739) NetType/WIFI Language/zh_CN',
    )
    .set('referer', 'https://www.xiaohongshu.com')
    .then((res, error) => {
      if (error) {
        // 请求出错，打印错误，返回
        log.error(error);
        return new Error(error);
      }
      return res.body.data;
    })
    .catch(err => console.log(err));

  return result;
}

async function getTopicFeed(topicId) {
  const result = await request
    .get(feedUrl.replace('$topicId', topicId))
    .set('Host', 'www.xiaohongshu.com')
    .set('Accept', 'application/json, text/plain, */*')
    .set('Accept-Encoding', 'gzip')
    .set('Accept-Language', 'zh-CN,zh;q=0.9')
    .set(
      'User-Agent',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36',
    )
    .set(
      'Referer',
      'https://www.xiaohongshu.com/page/topics/$topicId?naviHidden=yes'.replace(
        '$topicId',
        topicId,
      ),
    )
    .then((res, error) => {
      if (error) {
        log.error(error);
        return new Error(error);
      }
      if (!res.body.success) {
        log.error(res.body);
        return new Error(res.body);
      }
      return res.body.data;
    });

  return result;
}

module.exports = {
  getTopic,
  getRelated,
  getTopicFeed,
};
