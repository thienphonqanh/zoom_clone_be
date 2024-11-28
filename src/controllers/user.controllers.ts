import { NextFunction, Request, Response } from 'express'
import { Params } from 'express-serve-static-core'
import { USER_MESSAGES } from '~/constants/messages'
import { Users } from '~/models/entity/users'
import { UpdateMeReqBody } from '~/requests/user.requests'
import userServices from '~/services/user.services'
import { ResponseDataType } from '~/util/responseDataType'

export const getMeController = async (req: Request, res: Response<ResponseDataType<Users>>, next: NextFunction) => {
  const { user_id } = req.decoded_authorization
  const result: Users = (await userServices.getMeService(user_id)) as Users
  return res.json({
    message: USER_MESSAGES.GET_ME_SUCCESS,
    data: result
  })
}
export const updateMeController = async (
  req: Request<Params, any, UpdateMeReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { country, dob, name, phone } = req.body
  const { user_id: id } = req.decoded_authorization

  const result = await userServices.updateMeService({ country, dob, name, phone, id })
  return res.json(result)
}
