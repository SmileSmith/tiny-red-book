const topicModel = require('./topic.format.model');


module.exports = {
  setTopicResult: async (topicResultList) => {
    topicModel.collection.insert(topicResultList, (err) => {
      if (err) {
        console.log(`save feedList ${err}: failed`);
      } else {
        console.info(`save feedList ${topicResultList.length}: success`);
      }
    });
  },
};
