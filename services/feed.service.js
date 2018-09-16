const Feed = require('../spiders/feed');
const FeedDao = require('../daos/feed.dao');
const { getDateStr } = require('./util');

const date = getDateStr();

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
      thatFeed.ss_date = date;
      thatFeed.ss_oid = oid;
    });
  }
  FeedDao.setFeedInfoList(feedInfoList);
}

module.exports = {
  initFeedInfo,
};
