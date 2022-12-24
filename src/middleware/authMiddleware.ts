import { Request, Response, NextFunction } from 'express'
import { NotAuthorizedError } from '../errors/not-authorized-error'

export const requireAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //if (!user) {
  //throw new NotAuthorizedError()
  //}

  //req.user = user

  next()
}
