import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { validateRequest } from '../../middleware/validate-request'
import { BadRequestError } from '../../errors/bad-request-error'
import { User } from '../../models/user'

const router = express.Router()

router.post(
  '/api/v1/users/signup',
  [
    body('fiName')
      .isString()
      .trim()
      .notEmpty()
      .isLength({ min: 2, max: 20 })
      .withMessage('first Name must be valid'),

    body('laName')
      .isString()
      .trim()
      .notEmpty()
      .isLength({ min: 2, max: 20 })
      .withMessage('last Name must be valid'),

    body('isMale').trim().notEmpty().withMessage('gender must be valid'),

    body('mobile')
      .trim()
      .notEmpty()
      .isLength({ min: 11, max: 11 })
      .withMessage('mobile must be valid'),

    body('password')
      .trim()
      .notEmpty()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { fiName, laName, isMale, mobile, password } = req.body

    const existingUser = await User.findOne({ mobile })

    if (existingUser) {
      throw new BadRequestError('mobile in use')
    }

    const user = User.build({ fiName, laName, isMale, mobile, password })
    await user.save()

    // Generate JWT
    const userJWT = jwt.sign(
      {
        id: user.id,
        mobile: user.mobile,
        fiName: user.fiName,
        laName: user.laName,
        isMale: user.isMale,
        role: user.role,
      },
      process.env.JWT_KEY!
    )

    //req.session.user = userJWT

    // Store it on session object
    req.session = {
      jwt: userJWT,
    }

    res.status(201).send(userJWT)
  }
)

export { router as signupRouter }
