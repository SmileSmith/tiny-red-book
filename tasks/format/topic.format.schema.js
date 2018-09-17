const mongoose = require('mongoose');

const { Schema } = mongoose;

// 创建Schema
const topicSchema = new Schema({
  // 话题ID，理论上和page_id一致，不太确定 TODO: 确认page的模型
  id: String,
  // 话题Banner图片
  banner: String,
  // 话题描述
  desc: String,
  // 笔记数（重要）
  discuss_num: Number,
  // 话题名称
  name: String,
  // 浏览数（重要）
  view_num: Number,
  // 关联话题
  related_topics: String,
  // 关联话题
  feeds: String,
});

module.exports = topicSchema;
