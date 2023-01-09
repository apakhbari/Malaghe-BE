import express, { Request, Response } from 'express'
import { BadRequestError } from '../../errors/bad-request-error'

import { Order } from '../../models/order'

const ObjectId = require('mongodb').ObjectId

const router = express.Router()

router.get(
  '/api/v1/orders/workflow/:id',
  async (req: Request, res: Response) => {
    const existingOrder = await Order.findById(req.params.id).select('workflow')

    if (!existingOrder) {
      throw new BadRequestError('find order by id failed')
    }

    res.send(existingOrder)
  }
)

export { router as findByIDForWorkFlowOrdersRouter }
