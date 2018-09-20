const request = require('superagent');
const log4js = require('../config/log4js');
const { microAppUA, browserUA } = require('../constants/spider');

const log = log4js.getLogger('topic');

const homeReferer = 'https://www.xiaohongshu.com';
const host = 'www.xiaohongshu.com';
const topicUrl = 'https://www.xiaohongshu.com/web_api/sns/v2/page/$topicId/header';
const relatedUrl = 'https://www.xiaohongshu.com/web_api/sns/v1/page/$topicId/topic/related?page_index=1&page_size=100&page_type=topic';
const feedUrl = 'https://www.xiaohongshu.com/web_api/sns/v1/page/$topicId/notes?page=1&page_size=100';

async function getTopic(topicId) {
  const result = await request
    .get(topicUrl.replace('$topicId', topicId))
    .set('Host', host)
    .set('User-Agent', microAppUA)
    .set('referer', homeReferer)
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

async function getRelated(topicId) {
  const result = await request
    .get(relatedUrl.replace('$topicId', topicId))
    .set('Host', host)
    .set('User-Agent', microAppUA)
    .set('referer', homeReferer)
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

async function getTopicFeed(topicId) {
  const result = await request
    .get(feedUrl.replace('$topicId', topicId))
    .set('Host', host)
    .set('Accept', 'application/json, text/plain, */*')
    .set('Accept-Encoding', 'gzip')
    .set('Accept-Language', 'zh-CN,zh;q=0.9')
    .set('User-Agent', browserUA)
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
    })
    .catch((error) => {
      log.error(error);
      return new Error(error);
    });

  return result;
}

module.exports = {
  getTopic,
  getRelated,
  getTopicFeed,
};
