import express, { Request, Response } from 'express'
import { BadRequestError } from '../../errors/bad-request-error'

import { Order } from '../../models/order'

const ObjectId = require('mongodb').ObjectId

const router = express.Router()

router.get(
  '/api/v1/orders/workflow/:code',
  async (req: Request, res: Response) => {
    const existingOrder = await Order.find({
      code: Number(req.params.code),
    }).select('workflow')

    if (!existingOrder) {
      throw new BadRequestError('find order by code failed')
    }

    res.send(existingOrder)
  }
)

export { router as findByCodeForWorkFlowOrdersRouter }
