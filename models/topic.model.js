const mongoose = require('mongoose');

const topicSchema = require('../schemas/topic.schema');

const topic = mongoose.model('weibo_user', topicSchema);
module.exports = topic;
