import 'express-async-errors'
import mongoose from 'mongoose'

const { MONGO_USER, MONGO_PASSWORD, MONGO_ADDRESS } = require('./config/config')

import { app } from './app'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }
  if (!process.env.MONGO_USER || !process.env.MONGO_PASSWORD) {
    throw new Error('process.env MONGO_USER , MONGO_PASSWORD  must be defined')
  }

  if (!process.env.MONGO_ADDRESS) {
    throw new Error('MONGO_ADDRESS must be defined')
  }

  try {
    const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_ADDRESS}`

    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('Connected to mongodb!')

    console.log(`########################################
  developed by:
      _______  _______  _______
     |   _   ||       ||   _   |
     |  |_|  ||    _  ||  |_|  |
     |       ||   |_| ||       |
     |       ||    ___||       |
     |   _   ||   |    |   _   |
     |__| |__||___|    |__| |__|
  © 2022-2023, APA, All Rights Reserved.
########################################
     `)
  } catch (err) {
    console.log(err)
  }
}

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})

start()
