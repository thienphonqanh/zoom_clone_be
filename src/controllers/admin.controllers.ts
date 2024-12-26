import { NextFunction, Request, Response } from 'express'
import { ADMIN_MESSAGES } from '~/constants/messages'
import { GetAllUserResponse } from '~/responses/admin.responses'
import adminServices from '~/services/admin.services'
import { ResponseDataType } from '~/util/responseDataType'
import { ParamsDictionary } from 'express-serve-static-core'
import {
  CreateUserReqBody,
  DeleteRoomReqParams,
  DeleteUserReqParams,
  UpdateUserReqBody
} from '~/requests/admin.requests'
import { Users } from '~/models/entity/users'
import { Rooms } from '~/models/entity/rooms'

export const getAllUserController = async (
  req: Request,
  res: Response<ResponseDataType<GetAllUserResponse[]>>,
  next: NextFunction
) => {
  const result = await adminServices.getAllUser()
  return res.json({
    message: ADMIN_MESSAGES.GET_ALL_USER_SUCCESS,
    data: result
  })
}

export const getOneUserController = async (
  req: Request,
  res: Response<ResponseDataType<GetAllUserResponse>>,
  next: NextFunction
) => {
  const result = await adminServices.getOneUser(req.params.id)
  return res.json({ message: ADMIN_MESSAGES.GET_USER_SUCCESS, data: result as Users })
}

export const createUserController = async (
  req: Request<ParamsDictionary, any, CreateUserReqBody>,
  res: Response<ResponseDataType>,
  next: NextFunction
) => {
  const result = await adminServices.createUser(req.body)
  return res.json({ message: result })
}

export const updateUserController = async (
  req: Request<ParamsDictionary, any, UpdateUserReqBody>,
  res: Response<ResponseDataType>,
  next: NextFunction
) => {
  const { changePassword, ...updateData } = req.body
  const result = await adminServices.updateUser(updateData)
  return res.json({ message: result })
}

export const deleteUserController = async (
  req: Request<DeleteUserReqParams>,
  res: Response<ResponseDataType>,
  next: NextFunction
) => {
  const result = await adminServices.deleteUser(req.params)
  return res.json({ message: result })
}

export const deleteRoomController = async (
  req: Request<DeleteRoomReqParams>,
  res: Response<ResponseDataType>,
  next: NextFunction
) => {
  const result = await adminServices.deleteRoom(req.params)
  return res.json({ message: result })
}

export const getAllRoomController = async (
  req: Request,
  res: Response<ResponseDataType<Rooms[]>>,
  next: NextFunction
) => {
  const result = await adminServices.getAllRoom()
  return res.json({
    message: ADMIN_MESSAGES.GET_ALL_ROOM_SUCCESS,
    data: result as Rooms[]
  })
}
