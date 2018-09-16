const FeedModel = require('../models/feed.model');
const { dbErr, checkNull } = require('./util');

module.exports = {
  getUidByOpenid: async (openid) => {
    const result = await FeedModel.findOne({ openid }).then(
      doc => checkNull(doc, openid),
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
};
