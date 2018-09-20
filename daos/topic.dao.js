const Topic = require('../models/topic.model');
const log4js = require('../config/log4js');
const { dbErr, checkNull } = require('./util');

const log = log4js.getLogger('topicDao');

module.exports = {
  getManyTopicBy: async (param) => {
    const result = await Topic.find(param).then(doc => checkNull(doc, param), () => dbErr());
    return result;
  },
  getTopicBy: async (param) => {
    const result = await Topic.findOne(param).then(doc => checkNull(doc, param), () => dbErr());
    return result;
  },
  setTopicInfo: async (topicInfo) => {
    const topic = new Topic(topicInfo);
    topic.save((err) => {
      if (err) {
        log.error(`save topic ${topicInfo.id}: failed: ${err}`);
      } else {
        log.info(`save topic ${topicInfo.id}: success`);
      }
    });
  },
};
