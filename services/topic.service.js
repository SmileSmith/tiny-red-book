const feedService = require('./feed.service');
const itemService = require('./item.service');
const topicDao = require('../daos/topic.dao');
const Topic = require('../spiders/topic');
const { nowDate, timeout } = require('./util');

/**
 * 获取多个Topic
 *
 * @returns
 */
async function getManyTopic(param) {
  console.log(22);
  const feed = await topicDao.getManyTopicBy(param);
  return feed;
}


/**
 * 获取一个Topic
 *
 * @returns
 */
async function getOneTopic(param) {
  const feed = await topicDao.getTopicBy(param);
  return feed;
}

async function setTopicInfo(topicId) {
  const topic = await getOneTopic({ page_id: topicId });
  if (topic && topic.page_id) return;
  const topicInfo = await Topic.getTopic(topicId);
  const relatedTopics = await Topic.getRelated(topicId);
  const feeds = await Topic.getTopicFeed(topicId);
  topicInfo.related_topics = relatedTopics.map(relate => ({
    page_id: relate.page_id,
    page_info: relate.page_info,
    ss_crawled: false,
    ss_date: nowDate,
  }));
  topicInfo.feeds = feeds;
  topicInfo.id = topicId;
  topicInfo.ss_crawled = false;
  topicInfo.ss_date = nowDate;
  const success = await topicDao.setTopicInfo(topicInfo);
  return success;
}

async function setFeedRelatedTopicInfo() {
  const feed = await feedService.getOneFeed();
  feed.topics = await itemService.getTopicIds(feed.id);
  const successList = [];
  if (feed.topics instanceof Array) {
    console.log(feed.topics);
    for (const topicId of feed.topics) {
      successList.push(await setTopicInfo(topicId));
      await timeout(2000);
    }
    await feedService.setFeedTopicCrawled(feed);
  }
  return successList;
}

module.exports = {
  setFeedRelatedTopicInfo,
  getOneTopic,
  getManyTopic,
};
