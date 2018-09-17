const Anti = require('../spiders/anti');
const Item = require('../spiders/item');

async function getTopicIds(itemId) {
  await Anti.init();
  let topicIds = await Item.getTopicIds(itemId);
  if (topicIds instanceof Array) {
    return topicIds;
  }
  if (topicIds instanceof Error) {
    const url = topicIds.message;
    const anti = await Anti.getAntiId(url);
    Item.setConfig({ newanti: anti });
  }
  topicIds = await Item.getTopicIds(itemId);
  return topicIds;
}

module.exports = {
  getTopicIds,
};

getTopicIds('5b38f71dec9d130b9480e72a');
