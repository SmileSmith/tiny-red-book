const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: {
      type: 'console',
    },
    spider: {
      type: 'dateFile',
      filename: 'log/spider.log',
      pattern: '-yyyy-MM-dd',
    },
    service: {
      type: 'dateFile',
      filename: 'log/service.log',
      pattern: '-yyyy-MM-dd',
    },
    dao: {
      type: 'dateFile',
      filename: 'log/dao.log',
      pattern: '-yyyy-MM-dd',
    },
    app: {
      type: 'file',
      filename: 'log/app.log',
      maxLogSize: 10485760,
      numBackups: 3,
    },
    errorFile: {
      type: 'file',
      filename: 'log/errors.log',
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: { appenders: ['app', 'errors'], level: 'DEBUG' },
    item: { appenders: ['spider', 'console', 'errors'], level: 'DEBUG' },
    feed: { appenders: ['spider', 'console', 'errors'], level: 'DEBUG' },
    topic: { appenders: ['spider', 'console', 'errors'], level: 'DEBUG' },
    itemService: { appenders: ['service', 'console', 'errors'], level: 'DEBUG' },
    feedService: { appenders: ['service', 'console', 'errors'], level: 'DEBUG' },
    topicService: { appenders: ['service', 'console', 'errors'], level: 'DEBUG' },
    formatDao: { appenders: ['dao', 'console', 'errors'], level: 'DEBUG' },
    feedDao: { appenders: ['dao', 'console', 'errors'], level: 'DEBUG' },
    topicDao: { appenders: ['dao', 'console', 'errors'], level: 'DEBUG' },
  },
  replaceConsole: true,
});

module.exports = log4js;
