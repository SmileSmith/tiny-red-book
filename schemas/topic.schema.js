const mongoose = require('mongoose');

const { Schema } = mongoose;

// 创建Schema
const topicSchema = new Schema({
  // 微信用户微信ID
  id: String,
  // 微博用户ID
  uid: String,
});

module.exports = topicSchema;
