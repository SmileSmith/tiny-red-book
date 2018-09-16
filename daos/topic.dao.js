const Topic = require('../models/topic.model');

const { dbErr, checkNull } = require('./util');

module.exports = {
  getUidByOpenid: async (openid) => {
    const result = await Topic.findOne({ openid }).then(
      doc => checkNull(doc, openid),
      () => dbErr(),
    );
    return result;
  },
  setWeiboInfo: async (openid, weiboInfo) => {
    const topic = new Topic({
      openid,
      uid: weiboInfo.uid,
    });

    topic.save((err) => {
      console.log(`save topic ${openid}:`, err ? 'failed' : 'success');
    });
  },
};
