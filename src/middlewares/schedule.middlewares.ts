import { body, param } from 'express-validator'
import { validate } from '~/util/validate'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { Rooms } from '~/models/entity/rooms'
import { ROOM_MESSAGES, SCHEDULE_MESSAGES } from '~/constants/messages'
import { dataSource } from '~/dataSource'
import { ScheduledMeetings } from '~/models/entity/scheduledMeetings'

export const createNewScheduleValidator = validate([
  body('roomId').custom(async (value) => {
    if (value === '') return true
    const result = await dataSource
      .getRepository(Rooms)
      .createQueryBuilder('rooms')
      .where('rooms.name = :name', { name: value })
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

export const updateScheduleValidator = validate([
  body('roomId').custom(async (value) => {
    if (value === '') return true
    const result = await dataSource
      .getRepository(Rooms)
      .createQueryBuilder('rooms')
      .where('rooms.name = :name', { name: value })
      .getOne()
    if (!result) {
      throw new ErrorWithStatus({
        message: ROOM_MESSAGES.ROOM_ID_NOT_EXISTED,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    return true
  }),
  body('id')
    .notEmpty()
    .withMessage(SCHEDULE_MESSAGES.SCHEDULE_ID_IS_REQUIRED)
    .isString()
    .withMessage(SCHEDULE_MESSAGES.SCHEDULE_ID_IS_STRING)
    .custom(async (value) => {
      const result = await dataSource
        .getRepository(ScheduledMeetings)
        .createQueryBuilder('scheduled_meetings')
        .where('scheduled_meetings.id = :id', { id: value })
        .getOne()
      if (!result) {
        throw new ErrorWithStatus({
          message: SCHEDULE_MESSAGES.SCHEDULE_ID_NOT_EXISTED,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      return true
    })
])

export const deleteScheduleValidator = validate([
  param('id')
    .notEmpty()
    .withMessage(SCHEDULE_MESSAGES.SCHEDULE_ID_IS_REQUIRED)
    .isString()
    .withMessage(SCHEDULE_MESSAGES.SCHEDULE_ID_IS_STRING)
    .custom(async (value) => {
      const result = await dataSource
        .getRepository(ScheduledMeetings)
        .createQueryBuilder('scheduled_meetings')
        .where('scheduled_meetings.id = :id', { id: value })
        .getOne()
      if (!result) {
        throw new ErrorWithStatus({
          message: SCHEDULE_MESSAGES.SCHEDULE_ID_NOT_EXISTED,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      if (result.status === 'Canceled') {
        throw new ErrorWithStatus({
          message: SCHEDULE_MESSAGES.SCHEDULE_ID_NOT_EXISTED,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      return true
    })
])

export const checkScheduleIdValidator = validate([
  param('id')
    .notEmpty()
    .withMessage(SCHEDULE_MESSAGES.SCHEDULE_ID_IS_REQUIRED)
    .isString()
    .withMessage(SCHEDULE_MESSAGES.SCHEDULE_ID_IS_STRING)
    .custom(async (value) => {
      const result = await dataSource
        .getRepository(ScheduledMeetings)
        .createQueryBuilder('scheduled_meetings')
        .where('scheduled_meetings.id = :id', { id: value })
        .getOne()
      if (!result) {
        throw new ErrorWithStatus({
          message: SCHEDULE_MESSAGES.SCHEDULE_ID_NOT_EXISTED,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      return true
    })
])
