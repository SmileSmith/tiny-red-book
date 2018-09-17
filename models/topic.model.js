const mongoose = require('mongoose');

const topicSchema = require('../schemas/topic.schema');

const topic = mongoose.model('topic_info', topicSchema);
module.exports = topic;
