const Topic = require('../models/topic.model');

const { dbErr, checkNull } = require('./util');

module.exports = {
  getManyTopicBy: async (param) => {
    const result = await Topic.find(param).then(
      doc => checkNull(doc, param),
      () => dbErr(),
    );
    console.log(result);
    return result;
  },
  getTopicBy: async (param) => {
    const result = await Topic.findOne(param).then(
      doc => checkNull(doc, param),
      () => dbErr(),
    );
    return result;
  },
  setTopicInfo: async (topicInfo) => {
    const topic = new Topic(topicInfo);
    topic.save((err) => {
      console.log(`save topic ${topicInfo.id}:`, err ? 'failed' : 'success');
    });
  },
};
