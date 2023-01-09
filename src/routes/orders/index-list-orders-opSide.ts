import express, { Request, Response } from 'express'
import { Order } from '../../models/order'

const router = express.Router()

router.get(
  '/api/v1/orders/list/op-side',
  async (req: Request, res: Response) => {
    const existingOrder = await Order.find({ isClientSide: false })
      .select(
        'id code userName mobile isService serviceKind isDone createdAt overallPrice orderStatus'
      )
      .sort('-createdAt')
      .limit(30)

    res.send(existingOrder)
  }
)

export { router as indexOrderOpSideRouter }
