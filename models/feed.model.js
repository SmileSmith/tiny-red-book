const mongoose = require('mongoose');

const feedSchema = require('../schemas/feed.schema');

const feed = mongoose.model('fedd_info', feedSchema);
module.exports = feed;
