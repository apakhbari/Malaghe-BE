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
  if (!req.session?.jwt) {
    return next()
  }
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
