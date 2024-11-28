import { body, check, matchedData } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus'
import { dataSource } from '~/dataSource'
import { Users } from '~/models/entity/users'
import { ErrorWithStatus } from '~/models/Errors'
import { hashPassword } from '~/util/crypto'
import { validate } from '~/util/validate'
import { Request } from 'express'
import { verifyToken } from '~/util/jwt'
import { RefreshToken } from '~/models/entity/refreshToken'
import { AUTH_MESSAGES } from '~/constants/messages'

export const loginValidator = validate([
  body('email').isEmail().withMessage(AUTH_MESSAGES.EMAIL_IS_INVALID),
  body('password')
    .notEmpty()
    .withMessage(AUTH_MESSAGES.PASSWORD_IS_REQUIRED)
    .custom(async (value, { req }) => {
      const { email } = matchedData(req, { includeOptionals: true })
      const decodePassword = hashPassword(value)
      const user = await dataSource
        .getRepository(Users)
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .andWhere('user.password = :decodePassword', { decodePassword })
        .getOne()
      if (!user) {
        throw new ErrorWithStatus({
          message: AUTH_MESSAGES.LOGIN_FAIL,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      ;(req as Request).user = user
      return true
    })
])

export const registerValidator = validate([
  body('email')
    .isEmail()
    .withMessage(AUTH_MESSAGES.EMAIL_IS_INVALID)
    .custom(async (value) => {
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
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage(AUTH_MESSAGES.PASSWORD_MUST_BE_STRONG)
])

export const accessTokenValidator = validate([
  check('Authorization')
    .exists()
    .withMessage(AUTH_MESSAGES.AUTHORIZATION_HEADER_IS_REQUIRED)
    .custom(async (value, { req }) => {
      // Split the Authorization header and check if it starts with "Bearer"
      if (!value || !value.startsWith('Bearer ')) {
        throw new Error(AUTH_MESSAGES.AUTHORIZATION_HEADER_IS_INVALID)
      }
      // Extract the token from the Bearer string
      const access_token = value.split(' ')[1]
      if (!access_token) {
        throw new Error(AUTH_MESSAGES.ACCESS_TOKEN_IS_REQUIRED)
      }
      const decoded_authorization = await verifyToken({
        token: access_token,
        privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
      })
      //cast req from express-validator to Request type of express
      //user semi collumn because we use bracket here
      ;(req as Request).decoded_authorization = decoded_authorization
      return true // Token exists and follows the Bearer pattern
    })
])

export const refreshTokenValidator = validate([
  body('refreshToken').custom(async (value: string, { req }) => {
    if (!value) {
      throw new ErrorWithStatus({
        message: AUTH_MESSAGES.REFRESH_TOKEN_IS_REQUIRED,
        status: HTTP_STATUS.UNAUTHORIZED
      })
    }
    const [decoded_refresh_token, refreshToken] = await Promise.all([
      verifyToken({ token: value, privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string }),
      dataSource
        .getRepository(RefreshToken)
        .createQueryBuilder('refreshToken')
        .where('refreshToken.token = :token', { token: value })
        .getOne()
    ])
    if (refreshToken === null) {
      throw new ErrorWithStatus({
        message: AUTH_MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXISTS,
        status: HTTP_STATUS.UNAUTHORIZED
      })
    }
    ;(req as Request).decoded_refresh_token = decoded_refresh_token
    return true
  })
])
