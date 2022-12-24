import { Request, Response, NextFunction } from 'express'
import { NotAuthorizedError } from '../errors/not-authorized-error'

import { UsersRoles } from '../events/types/users-roles'

export const requireAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const haveAccess = [UsersRoles.Admin, UsersRoles.Operator]

  if (!req.currentUser) {
    throw new NotAuthorizedError()
  }

  if (haveAccess.includes(req.currentUser.role)) {
    throw new NotAuthorizedError()
  }

  next()
}
