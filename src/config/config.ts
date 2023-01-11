module.exports = {
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_ADDRESS: process.env.MONGO_ADDRESS,

  JWT_KEY: 12345678 || process.env.JWT_KEY,

  //REDIS_URL: 'redis' || process.env.REDIS_URL,
  //REDIS_PORT: 6379 || process.env.REDIS_PORT,

  SESSION_SECRET: 'secret' || process.env.SESSION_SECRET,

  NODE_ENV: 'development' || process.env.NODE_ENV,
}
