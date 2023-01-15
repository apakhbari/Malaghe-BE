import mongoose from 'mongoose'
import express, { Request, Response } from 'express'

import { body } from 'express-validator'

import { BadRequestError } from '../../errors/bad-request-error'
import { validateRequest } from '../../middleware/validate-request'
import { currentUser } from '../../middleware/current-user'
import { requireAuth } from '../../middleware/require-auth'

import { Order } from '../../models/order'

const router = express.Router()

var generatedCode = Math.floor(10000 + Math.random() * 90000)

let dateTime = new Date()

router.post(
  '/api/v1/orders/service',
  //currentUser,
  //requireAccess,
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      userId,
      userName,
      isMale,
      mobile,
      phone,
      postalCode,
      address,

      paymentKind,
      isExpress,
      serviceKind,

      products,
    } = req.body

    // Make sure the order is not already db
    const existingOrder = await Order.findOne({ generatedCode })

    if (existingOrder) {
      throw new BadRequestError('لطفا دوبارع تلاش کنید. code in use')
    }

    // Build the store and save it to the database
    const store = Order.build({
      code: generatedCode,
      userId,
      userName,
      isMale,
      phone,
      mobile,
      postalCode,
      address,

      paymentKind,

      orderStatus: 1,
      isClientSide: false,

      isExpress,
      isService: true,
      serviceKind,

      workflow: [
        {
          time: dateTime,
          flowStatus: 1,
        },
      ],
      products,
    })
    await store.save()

    res.status(201).send(store)
  }
)

export { router as newServiceOrderRouter }
