import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { validateRequest } from '../../middleware/validate-request'
import { BadRequestError } from '../../errors/bad-request-error'

import { User } from '../../models/user'
import { Password } from '../../services/password'

const router = express.Router()

router.post(
  '/api/v1/users/signin',
  [
    body('mobile')
      .trim()
      .notEmpty()
      .isNumeric()
      .isLength({ min: 11, max: 11 })
      .withMessage('mobile must be valid'),

    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { mobile, password } = req.body

    const existingUser = await User.findOne({ mobile })

    if (!existingUser) {
      throw new BadRequestError('Login request failed')
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    )

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials')
    }

    // Generate JWT
    const userJWT = jwt.sign(
      {
        id: existingUser.id,
        mobile: existingUser.mobile,
        fiName: existingUser.fiName,
        laName: existingUser.laName,
        gender: existingUser.gender,
        role: existingUser.role,
      },
      process.env.JWT_KEY!
    )

    //req.session.user = userJWT

    // Store it on session object
    req.session = {
      jwt: userJWT,
    }

    res.status(200).send(existingUser)
  }
)

export { router as signinRouter }
