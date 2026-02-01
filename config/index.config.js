const os = require('os');
const pjson = require('../package.json');
const utils = require('../libs/utils');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const SERVICE_NAME = process.env.SERVICE_NAME
  ? utils.slugify(process.env.SERVICE_NAME)
  : pjson.name;

const USER_PORT = process.env.PORT || process.env.USER_PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

const MONGO_URI = process.env.MONGO_URI;
const LONG_TOKEN_SECRET = process.env.LONG_TOKEN_SECRET;
const SHORT_TOKEN_SECRET = process.env.SHORT_TOKEN_SECRET || null;
const NACL_SECRET = process.env.NACL_SECRET || null;

// 🔍 hard proof log
console.log('BOOT ENV CHECK:', {
  MONGO_URI,
  HAS_LONG_TOKEN: !!LONG_TOKEN_SECRET,
  NODE_ENV: ENV,
});

if (!MONGO_URI) {
  throw new Error('MONGO_URI is required');
}

if (!LONG_TOKEN_SECRET) {
  throw new Error('LONG_TOKEN_SECRET is required');
}

module.exports = {
  SERVICE_NAME,
  ENV,
  USER_PORT,
  MONGO_URI,
  LONG_TOKEN_SECRET,
  SHORT_TOKEN_SECRET,
  NACL_SECRET,
};
