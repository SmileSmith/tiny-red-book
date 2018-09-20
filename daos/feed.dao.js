const FeedModel = require('../models/feed.model');
const log4js = require('../config/log4js');
const { dbErr, checkNull } = require('./util');

const log = log4js.getLogger('feedDao');

module.exports = {
  getFeedBy: async (param) => {
    const result = await FeedModel.findOne(param).then(
      doc => checkNull(doc, param),
      () => dbErr(),
    );
    return result;
  },
  setFeedInfoList: async (feedInfoList) => {
    FeedModel.collection.insert(feedInfoList, (err) => {
      if (err) {
        log.error(`save feedList ${err}: failed`);
      } else {
        log.info(`save feedList ${feedInfoList.length}: success`);
      }
    });
  },
  setFeedTopicCrawled: async (feed) => {
    FeedModel.collection.updateMany(
      { id: feed.id },
      { $set: { ss_crawled: true, topics: feed.topics } },
      {},
      (err) => {
        if (err) {
          log.error(`update feed ss_crawled ${feed.id}: failed: ${err}`);
        } else {
          log.info(`update feed ss_crawled ${feed.id}: success`);
        }
      },
    );
  },
};
