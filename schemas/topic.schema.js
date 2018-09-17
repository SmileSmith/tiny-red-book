const mongoose = require('mongoose');

const { Schema } = mongoose;

// 创建Schema
const topicSchema = new Schema({
  // 话题ID，理论上和page_id一致，不太确定 TODO: 确认page的模型
  id: String,
  // 页面ID
  page_id: String,
  // 话题相信数据
  page_info: {
    // 话题Banner图片
    banner: String,
    // 话题描述
    desc: String,
    // 笔记数（重要）
    discuss_num: Number,
    // 话题Logo图片
    logo: String,
    // 导航模块
    modules: Array,
    // 话题名称
    name: String,
    // 官方相框数
    official_album_num: Number,
    // 浏览数（重要）
    view_num: Number,
  },
  // 关联话题
  related_topics: Array,
  // 关联话题
  feeds: Array,
  // 是否已使用
  ss_crawled: Boolean,
  // 抓取日期
  ss_date: String,
});

module.exports = topicSchema;
