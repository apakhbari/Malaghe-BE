import express, { Request, Response } from 'express'
import { Order } from '../../models/order'

const router = express.Router()

router.get('/api/v1/orders', async (req: Request, res: Response) => {
  const existingOrder = await Order.find({}).sort('-createdAt').limit(30)

  res.send(existingOrder)
})

export { router as indexOrderRouter }
