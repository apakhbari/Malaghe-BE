import express, { Request, Response } from 'express'
import { BadRequestError } from '../../errors/bad-request-error'

import { Order } from '../../models/order'

const ObjectId = require('mongodb').ObjectId

const router = express.Router()

router.get('/api/v1/orders/stat/:id', async (req: Request, res: Response) => {
  const allOrders = await Order.countDocuments({ id: Number(req.params.id) })

  const DoneOrder = await Order.countDocuments({
    id: Number(req.params.id),
    isDone: true,
  })

  const data = {
    allOrders,
    DoneOrder,
    inProgree: allOrders - DoneOrder,
  }

  res.send(data)
})

export { router as countByIdForStatOrdersRouter }
