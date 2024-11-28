import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Room } from './room'
import { Users } from './users'
import { CreatedUpdated } from '~/common/createdUpdatedEntity'
import { ScheduleStatus } from '~/constants/enum'

@Entity()
export class ScheduledMeetings extends CreatedUpdated {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'start_time', nullable: false })
  startTime?: Date

  @Column({ name: 'end_time', nullable: false })
  endTime?: Date

  @Column({
    type: 'enum',
    enum: ScheduleStatus,
    nullable: false
  })
  status?: ScheduleStatus

  @ManyToOne(() => Room, (room) => room.scheduledMeeting)
  @JoinColumn({ name: 'room_id' })
  room?: Room

  @ManyToOne(() => Users, (user) => user.scheduledMeeting)
  @JoinColumn({ name: 'user_id' })
  user?: Users
}
