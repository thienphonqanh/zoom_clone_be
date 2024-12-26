import { body, param } from 'express-validator'
import { validate } from '~/util/validate'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { dataSource } from '~/dataSource'
import { ADMIN_MESSAGES, AUTH_MESSAGES, ROOM_MESSAGES, USER_MESSAGES } from '~/constants/messages'
import { Users } from '~/models/entity/users'
import { Rooms } from '~/models/entity/rooms'

export const updateUserValidator = validate([
  body('id')
    .notEmpty()
    .withMessage(ADMIN_MESSAGES.USER_ID_IS_REQUIRED)
    .custom(async (value) => {
      const result = await dataSource
        .getRepository(Users)
        .createQueryBuilder('user')
        .where('user.id = :id', { id: value })
        .getOne()
      if (!result) {
        throw new ErrorWithStatus({
          message: USER_MESSAGES.USER_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      return true
    }),
  body('email')
    .isEmail()
    .withMessage(AUTH_MESSAGES.EMAIL_IS_INVALID)
    .custom(async (value, { req }) => {
      const getPreEmail = await dataSource
        .getRepository(Users)
        .createQueryBuilder('user')
        .where('user.id = :id', { id: req.body.id })
        .getOne()

      if (getPreEmail?.email === value) {
        return true
      }

      const firstUser = await dataSource
        .getRepository(Users)
        .createQueryBuilder('user')
        .where('user.email = :email', { email: value })
        .getOne()
      if (firstUser) {
        throw new ErrorWithStatus({
          message: AUTH_MESSAGES.USER_EXISTED,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      return true
    }),
  body('name')
    .trim()
    .notEmpty()
    .withMessage(AUTH_MESSAGES.NAME_IS_REQUIRED)
    .custom(async (value: string) => {
      if (value.length < 6) {
        throw new ErrorWithStatus({
          message: AUTH_MESSAGES.NAME_LENGTH_MUST_BE_GREATER_THAN_5,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      return true
    }),
  body('password')
    .optional()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage(AUTH_MESSAGES.PASSWORD_MUST_BE_STRONG)
])

export const checkUserIdValidator = validate([
  param('id')
    .notEmpty()
    .withMessage(ADMIN_MESSAGES.USER_ID_IS_REQUIRED)
    .isString()
    .withMessage(ADMIN_MESSAGES.USER_ID_IS_STRING)
    .custom(async (value) => {
      const result = await dataSource
        .getRepository(Users)
        .createQueryBuilder('user')
        .where('user.id = :id', { id: value })
        .getOne()
      if (!result) {
        throw new ErrorWithStatus({
          message: USER_MESSAGES.USER_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      return true
    })
])

export const checkRoomIdValidator = validate([
  param('id')
    .notEmpty()
    .withMessage(ROOM_MESSAGES.ROOM_ID_IS_REQUIRED)
    .isString()
    .withMessage(ROOM_MESSAGES.ROOM_ID_MUST_BE_STRING)
    .custom(async (value) => {
      const result = await dataSource
        .getRepository(Rooms)
        .createQueryBuilder('rooms')
        .where('rooms.id = :id', { id: value })
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
