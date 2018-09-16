const mongoose = require('mongoose');
const debug = require('debug')('foo:server');
const db = require('./db');

// 数据库地址： 'mongodb://用户名:密码@ip地址:端口号/数据库';

const defaultConfig = {
  port: 27017,
  db: 'tinyredbook',
};

module.exports = (config) => {
  const user = config.user || db.user;
  const pwd = config.pwd || db.pwd;
  const host = config.host || db.host;
  const mongodb = `mongodb://${user}:${pwd}@${host}:${defaultConfig.port}/${defaultConfig.db}`;
  console.log(mongodb);
  mongoose.connect(mongodb); // 连接mongodb数据库
  // 实例化连接对象
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, '连接错误：'));
  db.once('open', (callback) => {
    debug(`MongoDB open on ${mongodb}`);
  });
  return db;
};
