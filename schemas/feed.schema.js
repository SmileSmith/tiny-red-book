const mongoose = require('mongoose');

const { Schema } = mongoose;

// 创建Schema
const feedSchema = new Schema({
  // feedId
  id: String,
  // 是否有效
  enabled: Boolean,
  // 等级
  level: Number,
  // 类型
  type: String,
  // feed标题
  title: String,
  // 详情页链接
  share_link: String,
  // 喜欢数
  likes: Number,
  // 评论数
  comments: Number,
  // 视频ID
  video_id: String,
  // 内部model
  model_type: String,
  // 是否已爬取
  ss_crawled: Boolean,
  // 抓取日期
  ss_date: String,
});

module.exports = feedSchema;
