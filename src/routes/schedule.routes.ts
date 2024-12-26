import express from 'express'
import {
  createScheduleController,
  getAllScheduleController,
  deleteScheduleController,
  getOneScheduleController,
  updateScheduleController
} from '~/controllers/schedule.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import {
  checkScheduleIdValidator,
  createNewScheduleValidator,
  deleteScheduleValidator,
  updateScheduleValidator
} from '~/middlewares/schedule.middlewares'
import { wrapRequestHandler } from '~/util/handler'

const scheduleRoutes = express.Router()
/*  
    description: Get all schedules
    path: /schedules/schedule,
    method: GET,
    body: { }
*/
scheduleRoutes.get('/schedule', accessTokenValidator, wrapRequestHandler(getAllScheduleController))
/*  
    description: Get one schedule
    path: /schedules/schedule/:id,
    method: GET,
    body: { }
*/
scheduleRoutes.get(
  '/schedule/:id',
  accessTokenValidator,
  checkScheduleIdValidator,
  wrapRequestHandler(getOneScheduleController)
)
/*  
    description: Create a new schedule
    path: /schedules/schedule,
    method: POST,
    body: { roomId: string, name: string, start_time: string, 
      end_time: string, status: string, description (optional): string }
*/
scheduleRoutes.post(
  '/schedule',
  accessTokenValidator,
  createNewScheduleValidator,
  wrapRequestHandler(createScheduleController)
)
/*  
    description: Update a schedule
    path: /schedules/schedule,
    method: PUT,
    body: { roomId: string, name: string, start_time: string, 
      end_time: string, status: string, description (optional): string }
*/
scheduleRoutes.put(
  '/schedule',
  accessTokenValidator,
  updateScheduleValidator,
  wrapRequestHandler(updateScheduleController)
)
/*  
    description: Delete a schedule
    path: /schedules/schedule/:id,
    method: DELETE,
    params: { id: string }
*/
scheduleRoutes.delete(
  '/schedule/:id',
  accessTokenValidator,
  deleteScheduleValidator,
  wrapRequestHandler(deleteScheduleController)
)

export default scheduleRoutes
