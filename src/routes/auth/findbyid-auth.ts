import express, { Request, Response } from 'express'
import { BadRequestError } from '@apa_malaghe/utility'

import { User } from '../../models/user'

const ObjectId = require('mongodb').ObjectId

const router = express.Router()

router.get('/api/v1/users/:id', async (req: Request, res: Response) => {
  const existingUser = await User.findById(req.params.id).select('-createdAt')

  if (!existingUser) {
    throw new BadRequestError('find user by id failed')
  }

  res.send(existingUser)
})

export { router as findByIDAuthRouter }
