import { body } from 'express-validator'
import { validate } from '~/util/validate'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { dataSource } from '~/dataSource'
import { Room } from '~/models/entity/room'
import { ROOM_MESSAGES } from '~/constants/messages'

export const checkRoomIdValidator = validate([
  body('roomId')
    .notEmpty()
    .withMessage(ROOM_MESSAGES.ROOM_ID_IS_REQUIRED)
    .isString()
    .withMessage(ROOM_MESSAGES.ROOM_ID_MUST_BE_STRING)
    .custom(async (value, { req }) => {
      const result = await dataSource
        .getRepository(Room)
        .createQueryBuilder('room')
        .where('room.name = :name', { name: value })
        .getOne()

      if (!result) {
        throw new ErrorWithStatus({
          message: ROOM_MESSAGES.ROOM_ID_NOT_EXISTED,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      return true
    })
])
