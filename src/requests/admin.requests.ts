import { ParamsDictionary } from 'express-serve-static-core'

export interface CreateUserReqBody {
  name: string
  email: string
  password: string
}

export interface UpdateUserReqBody {
  id: number
  name: string
  email: string
  password: string
  confirmPassword: string
  changePassword?: boolean
}

export interface DeleteUserReqParams extends ParamsDictionary {
  id: string
}

export interface DeleteRoomReqParams extends ParamsDictionary {
  id: string
}
