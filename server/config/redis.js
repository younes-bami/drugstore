// redis.js
require('dotenv').config();

const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST, // Redis host
  port: process.env.REDIS_PORT, // Redis port
});

module.exports = redis;
