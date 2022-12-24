import { Request, Response, NextFunction } from 'express'

import { NotAuthorizedError } from '@apa_malaghe/utility'

export const requireAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!user) {
    throw new NotAuthorizedError()
  }

  req.user = user

  next()
}
