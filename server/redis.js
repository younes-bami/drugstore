// redis.js
const Redis = require('ioredis');

const redis = new Redis({
  host: 'localhost', // Redis host
  port: 6379,        // Redis port
});

module.exports = redis;
