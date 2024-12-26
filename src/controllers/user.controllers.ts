import { NextFunction, Request, Response } from 'express'
import { Params } from 'express-serve-static-core'
import { USER_MESSAGES } from '~/constants/messages'
import { UpdateMeReqBody } from '~/requests/user.requests'
import { GetMeResponse } from '~/responses/user.responses'
import userServices from '~/services/user.services'
import { ResponseDataType } from '~/util/responseDataType'

export const getMeController = async (
  req: Request,
  res: Response<ResponseDataType<GetMeResponse>>,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization
  const result = (await userServices.getMeService(user_id)) as GetMeResponse
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
