import express, { Request, Response } from 'express'
import { BadRequestError } from '../../errors/bad-request-error'

import { User } from '../../models/user'

const ObjectId = require('mongodb').ObjectId

const router = express.Router()

router.get('/api/v1/users/service/:id', async (req: Request, res: Response) => {
  const existingUser = await User.findById(req.params.id).select(
    'id fiName laName mobile phone locations gender'
  )

  if (!existingUser) {
    throw new BadRequestError('find user by id failed')
  }

  res.send(existingUser)
})

export { router as findByIDForServiceAuthRouter }
