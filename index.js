const mongoose = require('./config/mongoose');
const Anti = require('./spider/anti');
// 命令行读取用户名密码
const processArgs = process.argv.splice(2);
const user = processArgs[0];
const pwd = processArgs[1];
const host = processArgs[2];

// 1. 初始化数据库链接
mongoose({ user, pwd, host });
// 2. 初始化Puppeteer，用户获取antiId
Anti.init();
