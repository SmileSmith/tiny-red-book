const mongoose = require('../../config/mongoose');
const topicService = require('../../services/topic.service');
const topicFormatDao = require('./topic.format.dao');

// 命令行读取用户名密码
const processArgs = process.argv.splice(2);
const user = processArgs[0];
const pwd = processArgs[1];
const host = processArgs[2];

// 1. 初始化数据库链接
mongoose({ user, pwd, host });

async function format() {
  const allTopics = await topicService.getManyTopic({});
  const formatTopics = allTopics.map((topic) => {
    const page = topic.page_info;
    const relate = topic.related_topics
      .map(
        relatedTopic => `id: ${relatedTopic.page_id}, discuss_num: ${relatedTopic.page_info.discuss_num}, name: ${
          topic.page_info.name
        }`,
      )
      .join('\r\n');
    return {
      id: topic.id,
      banner: page.banner,
      name: page.name,
      desc: page.desc,
      view_num: page.view_num,
      discuss_num: page.discuss_num,
      related_topics: relate,
    };
  });
  console.log(formatTopics);
  topicFormatDao.setTopicResult(formatTopics);
}

format();
