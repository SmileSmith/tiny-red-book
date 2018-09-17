const FeedModel = require('../models/feed.model');
const { dbErr, checkNull } = require('./util');

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
        console.log(`save feedList ${err}: failed`);
      } else {
        console.info(`save feedList ${feedInfoList.length}: success`);
      }
    });
  },
  setFeedTopicCrawled: async (feed) => {
    FeedModel.collection.updateMany(
      { id: feed.id },
      { $set: { ss_crawled: true, topics: feed.topics } },
      {},
      (err) => {
        console.log(`update feed  ss_crawled ${feed.id}: ${err || 'success'}`);
      },
    );
  },
};
