import { SCHEDULE_MESSAGES } from '~/constants/messages'
import { dataSource } from '~/dataSource'
import { Rooms } from '~/models/entity/rooms'
import { ScheduledMeetings } from '~/models/entity/scheduledMeetings'
import { CreateScheduleReqBody, DeleteScheduleReqParams, UpdateScheduleReqBody } from '~/requests/schedule.requests'

class ScheduleServices {
  async getAllSchedule(user_id: string) {
    const result = await dataSource
      .getRepository(ScheduledMeetings)
      .createQueryBuilder('scheduled_meetings')
      .leftJoinAndSelect('scheduled_meetings.room', 'room')
      .where('scheduled_meetings.user_id = :userId', { userId: user_id })
      .andWhere('scheduled_meetings.status != :status', { status: 'Canceled' })
      .getMany()
    return result
  }

  async getOneSchedule(id: string) {
    const result = await dataSource
      .getRepository(ScheduledMeetings)
      .createQueryBuilder('scheduled_meetings')
      .leftJoinAndSelect('scheduled_meetings.room', 'room')
      .where('scheduled_meetings.id = :id', { id: id })
      .getOne()
    return result
  }

  async createSchedule(user_id: string, data: CreateScheduleReqBody) {
    const getRoom = await dataSource
      .getRepository(Rooms)
      .createQueryBuilder('rooms')
      .where('rooms.name = :roomName', { roomName: data.roomId })
      .getOne()

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(ScheduledMeetings)
      .values([
        {
          ...data,
          user: user_id,
          room: getRoom?.id,
          startTime: new Date(data.start_time),
          endTime: new Date(data.end_time)
        }
      ])
      .execute()
    return SCHEDULE_MESSAGES.CREATE_SCHEDULE_SUCCESS
  }

  async updateSchedule(data: UpdateScheduleReqBody) {
    const getRoom = await dataSource
      .getRepository(Rooms)
      .createQueryBuilder('rooms')
      .where('rooms.name = :roomName', { roomName: data.roomId })
      .getOne()

    const { roomId, ...updateData } = data
    await dataSource
      .createQueryBuilder()
      .update(ScheduledMeetings)
      .set({
        ...updateData,
        room: getRoom?.id,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime)
      })
      .where('id = :id', { id: data.id })
      .execute()
    return SCHEDULE_MESSAGES.UPDATE_SCHEDULE_SUCCESS
  }

  async deleteSchedule(data: DeleteScheduleReqParams) {
    await dataSource
      .createQueryBuilder()
      .update(ScheduledMeetings)
      .set({ status: 'Canceled' })
      .where('id = :id', { id: data.id })
      .execute()
    return SCHEDULE_MESSAGES.DELETE_SCHEDULE_SUCCESS
  }
}
const scheduleServices = new ScheduleServices()
export default scheduleServices
