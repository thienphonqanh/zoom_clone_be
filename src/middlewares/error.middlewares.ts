import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { omit } from 'lodash'
import { ErrorWithStatus } from '~/models/Errors'

export const defaultErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ErrorWithStatus) {
    return res.status(error.status).json(omit(error, ['status']))
  }

  Object.getOwnPropertyNames(error).forEach((key) => {
    Object.defineProperty(error, key, { enumerable: true })
  })
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: error.name,
    errorInfo: omit(error, ['stack'])
  })
}
