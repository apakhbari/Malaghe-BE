import express, { Request, Response } from 'express'

import { NotFoundError } from '../../errors/not-found-error'
import { requireAuth } from '../../middleware/require-auth'
import { requireAuthMiddleware } from '../../middleware/authMiddleware'
import { currentUser } from '../../middleware/current-user'

import { User } from '../../models/user'

const ObjectId = require('mongodb').ObjectId

const router = express.Router()

router.put(
  '/api/v1/users/:id',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id)

    if (!user) {
      throw new NotFoundError()
    }

    User.findByIdAndUpdate(
      req.params.id,
      {
        fiName: req.body.fiName,
        laName: req.body.laName,
        slug: req.body.slug,
        email: req.body.email,
        mobile: req.body.mobile,
        phone: req.body.phone,
        locations: req.body.locations,
        address: req.body.address,
        postalCode: req.body.postalCode,
      },
      function (err, result) {
        if (err) {
          res.send(err)
        } else {
          res.send(result)
        }
      }
    )
  }
)

export { router as updateUserRouter }
