const request = require('superagent');
const cheerio = require('cheerio');
const log4js = require('../config/log4js');

const log = log4js.getLogger('item');

// 目标链接
const itemUrlPrefix = 'https://www.xiaohongshu.com/discovery/item/';
let antiParam = '?_at=21980ef56cd4d31ccae60da140f82f55dd7a0';

async function getTopicIds(itemId = '5b95fae5910cf61268fdea0c') {
  const itemUrl = itemUrlPrefix + itemId;
  const result = await request
    .get(itemUrl + antiParam)
    .then((res, error) => {
      if (error) {
        // 请求出错，打印错误，返回
        log.error(error);
        return new Error(error);
      }
      if (!/icon/.test(res.text)) {
        // 不存在ICON，说明被anti了，返回链接
        return new Error(itemUrl);
      }
      // cheerio需要先load html
      const $ = cheerio.load(res.text);
      // 抓取需要的数据
      const topicIdArr = [];
      $('.content .hash-tag.topic_page').each((index, element) => {
        const href = $(element).attr('href');
        const reg = /topics\/(\w*)$/;
        if (reg.test(href)) {
          topicIdArr.push(href.match(reg)[1]);
        }
      });
      return topicIdArr;
    })
    .catch(err => new Error(err));
  return result;
}

function setConfig({ newanti }) {
  antiParam = `?_at=${newanti}`;
}

module.exports = { getTopicIds, setConfig };
