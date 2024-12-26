import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import HTTP_STATUS from '~/constants/httpStatus'
import { AUTH_MESSAGES, USER_MESSAGES } from '~/constants/messages'
import { Users } from '~/models/entity/users'
import { ErrorWithStatus } from '~/models/Errors'
import { LoginReqBody, LogoutReqBody, RegisterReqBody } from '~/requests/user.requests'
import { LoginResponse } from '~/responses/login.responses'
import authServices from '~/services/auth.services'
import { ResponseDataType } from '~/util/responseDataType'

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>,
  res: Response<ResponseDataType<LoginResponse>>,
  next: NextFunction
) => {
  const { id, name, role } = req.user as Users
  if (id != undefined && name != undefined) {
    const data: LoginResponse = await authServices.loginService({ id: id, name: name, role: role as string })
    return res.json({
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      data
    })
  }
  throw new ErrorWithStatus({
    message: USER_MESSAGES.USER_NOT_FOUND,
    status: HTTP_STATUS.NOT_FOUND
  })
  // return res.json({message: AUTH_MESSAGES.LOGGIN_SUCCESS, data: result})
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response<ResponseDataType>,
  next: NextFunction
) => {
  const { name, email, password, role } = req.body
  await authServices.registerService({ email, password, name, role })
  return res.json({
    message: AUTH_MESSAGES.REGISTER_SUCCESS
  })
}

export const logoutController = async (
  req: Request<ParamsDictionary, any, LogoutReqBody>,
  res: Response<ResponseDataType>,
  next: NextFunction
) => {
  const { refreshToken } = req.body
  await authServices.logout(refreshToken)
  return res.json({ message: AUTH_MESSAGES.LOGOUT_SUCCESS })
}
