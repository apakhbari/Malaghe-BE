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
  '/api/v1/orders/cart',
  //currentUser,
  //requireAccess,
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      userId,
      userName,
      gender,
      mobile,
      phone,
      postalCode,
      address,

      overallPrice,
      paymentKind,

      isExpress,

      products,
    } = req.body

    // Make sure the order is not already db
    const existingOrder = await Order.findOne({ generatedCode })

    if (existingOrder) {
      throw new BadRequestError('please try again')
    }

    // Build the store and save it to the database
    const store = Order.build({
      code: generatedCode,
      userId,
      userName,
      gender,
      phone,
      mobile,
      postalCode,
      address,

      overallPrice,
      paymentKind,

      orderStatus: 1,
      isClientSide: false,

      isExpress,
      isService: false,

      workflow: [
        {
          time: dateTime,
          orderStatus: 1,
          description: 'درخواست شما ثبت شد',
        },
      ],
      products,
    })
    await store.save()

    res.status(201).send(store)
  }
)

export { router as newCartOrderRouter }
