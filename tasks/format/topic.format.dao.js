const topicModel = require('./topic.format.model');
const log4js = require('../../config/log4js');

const log = log4js.getLogger('topicDao');

module.exports = {
  setTopicResult: async (topicResultList) => {
    topicModel.collection.insert(topicResultList, (err) => {
      if (err) {
        log.info(`save feedList ${err}: failed`);
      } else {
        log.info(`save feedList ${topicResultList.length}: success`);
      }
    });
  },
};
