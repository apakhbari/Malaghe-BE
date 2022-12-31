module.exports = {
  MONGO_URI: 'mongodb://mongo:27017/mongo' || process.env.MONGO_URI,

  MONGO_IP: 'mongo' || process.env.MONGO_IP,
  MONGO_PORT: 27017 || process.env.MONGO_PORT,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,

  JWT_KEY: 12345678 || process.env.JWT_KEY,

  REDIS_URL: 'redis' || process.env.REDIS_URL,
  REDIS_PORT: 6379 || process.env.REDIS_PORT,

  SESSION_SECRET: 'secret' || process.env.SESSION_SECRET,

  NODE_ENV: 'development' || process.env.NODE_ENV,
}
