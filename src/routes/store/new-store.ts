import mongoose from 'mongoose'
import express, { Request, Response } from 'express'
import {
  BadRequestError,
  validateRequest,
  currentUser,
  requireAccess,
} from '@apa_malaghe/utility'
import { body } from 'express-validator'
import { Store } from '../../models/store'

const router = express.Router()

router.post(
  '/api/v1/store',
  //currentUser,
  //requireAccess,
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      title,
      description,
      summary,
      volumes,
      photos,
      availableQuantity,
      price,
      hasDiscount,
      discountKind,
      discountedPrice,
      madeIn,
      goodKind,
      hasMag,
      magLink,
    } = req.body

    console.log(req.body)

    // Make sure the post is not already db
    const product = await Store.findOne({ title })

    if (product) {
      throw new BadRequestError('product Already in DB!')
    }

    // Build the store and save it to the database
    const store = Store.build({
      title,
      description,
      summary,
      volumes,
      photos,
      availableQuantity,
      price,
      hasDiscount,
      discountKind,
      discountedPrice,
      madeIn,
      goodKind,
      hasMag,
      magLink,
    })
    await store.save()

    res.status(201).send(store)
  }
)

export { router as newStoreRouter }
