const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: {
      type: 'console',
      category: 'console',
    },
    item: {
      type: 'dateFile',
      filename: 'log/item.log',
      pattern: '-yyyy-MM-dd',
      category: 'spider',
    },
    feed: {
      type: 'dateFile',
      filename: 'log/feed.log',
      pattern: '-yyyy-MM-dd',
      category: 'spider',
    },
    topic: {
      type: 'dateFile',
      filename: 'log/topic.log',
      pattern: '-yyyy-MM-dd',
      category: 'spider',
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
    spider: { appenders: ['item', 'feed', 'topic'], level: 'DEBUG' },
  },
  replaceConsole: true,
});

module.exports = log4js;
