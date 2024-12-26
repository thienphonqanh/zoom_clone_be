import { ParamsDictionary } from 'express-serve-static-core'

export interface CreateScheduleReqBody {
  user_id: string
  roomId: string
  name: string
  start_time: string
  end_time: string
  status: string
  description?: string
}

export interface UpdateScheduleReqBody {
  id: string
  roomId: string
  name: string
  startTime: string
  endTime: string
  status: string
  description?: string
}

export interface DeleteScheduleReqParams extends ParamsDictionary {
  id: string
}
