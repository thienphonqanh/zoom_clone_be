import { Role } from '~/constants/enum'
import { CreatedUpdated } from '../../common/createdUpdatedEntity'
import { Rooms } from './rooms'
import { ScheduledMeetings } from './scheduledMeetings'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

@Entity()
export class Users extends CreatedUpdated {
  @PrimaryColumn()
  id?: number

  @Column()
  name?: string

  @Column({ nullable: false })
  email?: string

  @Column({ nullable: false, select: false })
  password?: string

  @Column({ nullable: true })
  phone?: string

  @Column({ nullable: true, length: 100 })
  country?: string

  @Column({ nullable: true, type: 'date' })
  dob?: Date

  @Column({ nullable: true, default: Role.User, select: true })
  role?: string

  @OneToMany(() => Rooms, (room) => room.user)
  room?: Rooms[]

  @OneToMany(() => ScheduledMeetings, (scheduledMeeting) => scheduledMeeting.user)
  scheduledMeeting?: ScheduledMeetings[]
}
