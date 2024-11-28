import { body } from 'express-validator'
import { validate } from '~/util/validate'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { dataSource } from '~/dataSource'
import { Room } from '~/models/entity/room'
import { AUTH_MESSAGES, USER_MESSAGES } from '~/constants/messages'

export const updateMeValidator = validate([
  body('name')
    .trim()
    .isEmpty()
    .custom(async (value: string | undefined) => {
      if (value && value.length < 6) {
        throw new ErrorWithStatus({
          message: AUTH_MESSAGES.NAME_LENGTH_MUST_BE_GREATER_THAN_5,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      return true
    }),
  body('phone').custom((value: string | undefined) => {
    if (value && value?.length != 10) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: USER_MESSAGES.PHONE_LENGTH_MUST_BE_10
      })
    }
    return true
  })
])
