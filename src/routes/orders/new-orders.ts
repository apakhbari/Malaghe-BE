import mongoose from 'mongoose'
import express, { Request, Response } from 'express'
import {
  BadRequestError,
  validateRequest,
  currentUser,
  requireAccess,
} from '@apa_malaghe/utility'
import { body } from 'express-validator'

import { Order } from '../../models/order'

const router = express.Router()

router.post(
  '/api/v1/orders',
  //currentUser,
  //requireAccess,
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      code,
      userId,
      userName,
      gender,
      mobile,
      postalCode,
      address,

      isExpress,
      isService,
      serviceKind,

      workflow,
      products,
    } = req.body

    console.log(req.body)

    // Make sure the order is not already db
    const existingOrder = await Order.findOne({ code })

    if (existingOrder) {
      throw new BadRequestError('product Already in DB!')
    }

    // Build the store and save it to the database
    const store = Order.build({
      code,
      userId,
      userName,
      gender,
      mobile,
      postalCode,
      address,

      isExpress,
      isService,
      serviceKind,

      workflow,
      products,
    })
    await store.save()

    res.status(201).send(store)
  }
)

export { router as newOrderRouter }
