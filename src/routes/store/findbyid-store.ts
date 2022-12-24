import express, { Request, Response } from 'express'
import { BadRequestError } from '@apa_malaghe/utility'
import { Store } from '../../models/store'

const ObjectId = require('mongodb').ObjectId

const router = express.Router()

router.get('/api/v1/store/:id', async (req: Request, res: Response) => {
  const existingStore = await Store.findById(req.params.id).select('-createdAt')

  if (!existingStore) {
    throw new BadRequestError('find store by id failed')
  }

  res.send(existingStore)
})

export { router as findByIDStoreRouter }
