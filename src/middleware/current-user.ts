import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { UsersRoles } from '../types/users-roles'
import { UsersGender } from '../types/users-gender'

interface UserPayload {
  id: string
  mobile: number
  fiName: string
  laName: string
  gender: UsersGender
  role: UsersRoles
}

// Add an optional prop: currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.cookies)
  console.log(req.session)
  console.log(req.session?.currentUser)
  console.log(req.session?.jwt)

  if (!req.session?.jwt) {
    return next()
  }
  console.log(req.cookies)
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload
    req.currentUser = payload
  } catch (err) {
    console.log(err)
  }
  next()
}
