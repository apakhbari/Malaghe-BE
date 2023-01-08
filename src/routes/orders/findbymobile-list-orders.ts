import express, { Request, Response } from 'express'
import { BadRequestError } from '../../errors/bad-request-error'

import { Order } from '../../models/order'

const ObjectId = require('mongodb').ObjectId

const router = express.Router()

router.get(
  '/api/v1/orders/list/:mobileNumber',
  async (req: Request, res: Response) => {
    const existingOrder = await Order.find({
      mobile: Number(req.params.mobileNumber),
    })
      .select(
        'id code isService serviceKind isDone createdAt overallPrice orderStatus mobile'
      )
      .sort('-createdAt')
      .limit(30)

    if (!existingOrder) {
      throw new BadRequestError('finding by mobileNumber failed')
    }

    res.send(existingOrder)
  }
)

export { router as findByMobileForListOrdersRouter }
