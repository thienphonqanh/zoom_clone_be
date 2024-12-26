import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Rooms } from './rooms'
import { Users } from './users'
import { CreatedUpdated } from '~/common/createdUpdatedEntity'
import { ScheduleStatus } from '~/constants/enum'

@Entity()
export class ScheduledMeetings extends CreatedUpdated {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ nullable: false })
  name?: string

  @Column({ name: 'start_time', nullable: false })
  startTime?: Date

  @Column({ name: 'end_time', nullable: false })
  endTime?: Date

  @Column({ nullable: true })
  description?: string

  @Column({
    type: 'enum',
    enum: ScheduleStatus,
    nullable: false
  })
  status?: ScheduleStatus

  @ManyToOne(() => Rooms, (room) => room.scheduledMeeting, { nullable: true })
  @JoinColumn({ name: 'room_id' })
  room?: Rooms

  @ManyToOne(() => Users, (user) => user.scheduledMeeting)
  @JoinColumn({ name: 'user_id' })
  user?: Users
}
