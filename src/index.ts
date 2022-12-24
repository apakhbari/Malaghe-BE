import 'express-async-errors'
import mongoose from 'mongoose'

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
} = require('./config/config')

import { app } from './app'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }
  if (
    !process.env.MONGO_USER ||
    !process.env.MONGO_PASSWORD ||
    !process.env.MONGO_IP ||
    !process.env.MONGO_PORT
  ) {
    throw new Error('process.env must be defined')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }

  try {
    const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT};?authSource=admin`

    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('Connected to mongodb!')
  } catch (err) {
    console.log(err)
  }
}

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})

start()
