import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { UsersRoles } from '../types/users-roles'
import { UsersGender } from '../types/users-gender'

var Cookies = require('cookies')

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
  var cookies = new Cookies(req, res)

  var lastVisit1 = cookies.get('currentUser')
  console.log('lastVisit1: ' + lastVisit1)
  console.log('-------------------------')

  var lastVisit2 = cookies.get('jwt')
  console.log('lastVisit2: ' + lastVisit2)
  console.log('-------------------------')

  console.log('req.cookies: ' + req.cookies)
  console.log('-------------------------')

  console.log('req.session: ' + req.session)
  console.log('-------------------------')

  console.log('req.session?.currentUser: ' + req.session?.currentUser)
  console.log('-------------------------')

  console.log('req.session?.jwt: ' + req.session?.jwt)
  console.log('-------------------------')

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
