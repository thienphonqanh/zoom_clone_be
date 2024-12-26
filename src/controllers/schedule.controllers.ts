import { NextFunction, Request, Response } from 'express'
import scheduleServices from '~/services/schedule.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { CreateScheduleReqBody, DeleteScheduleReqParams, UpdateScheduleReqBody } from '~/requests/schedule.requests'
import { ResponseDataType } from '~/util/responseDataType'
import { SCHEDULE_MESSAGES } from '~/constants/messages'
import { GetAllScheduleResponse } from '~/responses/getAllSchedule.responses'
import { ScheduledMeetings } from '~/models/entity/scheduledMeetings'

export const getAllScheduleController = async (
  req: Request,
  res: Response<ResponseDataType<GetAllScheduleResponse[]>>,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization
  const result = await scheduleServices.getAllSchedule(user_id)
  return res.json({ message: SCHEDULE_MESSAGES.GET_ALL_SCHEDULE_SUCCESS, data: result })
}

export const getOneScheduleController = async (
  req: Request<DeleteScheduleReqParams>,
  res: Response<ResponseDataType<GetAllScheduleResponse>>,
  next: NextFunction
) => {
  const result = await scheduleServices.getOneSchedule(req.params.id)
  return res.json({ message: SCHEDULE_MESSAGES.GET_SCHEDULE_SUCCESS, data: result as ScheduledMeetings })
}

export const createScheduleController = async (
  req: Request<ParamsDictionary, any, CreateScheduleReqBody>,
  res: Response<ResponseDataType>,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization
  const result = await scheduleServices.createSchedule(user_id, req.body)
  return res.json({ message: result })
}

export const updateScheduleController = async (
  req: Request<ParamsDictionary, any, UpdateScheduleReqBody>,
  res: Response<ResponseDataType>,
  next: NextFunction
) => {
  const result = await scheduleServices.updateSchedule(req.body)
  return res.json({ message: result })
}

export const deleteScheduleController = async (
  req: Request<DeleteScheduleReqParams>,
  res: Response<ResponseDataType>,
  next: NextFunction
) => {
  const result = await scheduleServices.deleteSchedule(req.params)
  return res.json({ message: result })
}
