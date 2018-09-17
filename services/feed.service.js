const Feed = require('../spiders/feed');
const feedDao = require('../daos/feed.dao');
const { nowDate } = require('./util');
const { date } = require('../config/version');


/**
 * 初始化Feed数据种子
 *
 * @export
 * @returns
 */
async function initFeedInfo(oid) {
  const feedInfoList = await Feed.getFeeds(oid);
  if (feedInfoList instanceof Array) {
    feedInfoList.forEach((feed) => {
      const thatFeed = feed;
      thatFeed.ss_crawled = false;
      thatFeed.ss_date = nowDate;
      thatFeed.ss_oid = oid;
    });
  }
  feedDao.setFeedInfoList(feedInfoList);
}


/**
 * 获取一个还未被使用的feed
 *
 * @returns
 */
async function getOneFeed() {
  const feed = await feedDao.getFeedBy({
    ss_crawled: false,
    ss_date: date,
  });
  return feed;
}


/**
 * 设置该Feed已使用
 *
 * @param {*} feed
 * @returns
 */
async function setFeedTopicCrawled(feed) {
  const feedId = feed.id;
  if (!feedId) return Promise.resolve();
  return feedDao.setFeedTopicCrawled(feed);
}


module.exports = {
  initFeedInfo,
  getOneFeed,
  setFeedTopicCrawled,
};
