import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'
import { CreatedUpdated } from '../../common/createdUpdatedEntity'
import { Room } from './room'
import { Participants } from './participants'
import { ScheduledMeetings } from './scheduledMeetings'
import { Messages } from './messages'

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

  @Column({ nullable: true, default: 0, select: false })
  role?: number

  @OneToMany(() => Room, (room) => room.user)
  room?: Room[]

  @OneToMany(() => Participants, (participant) => participant.user)
  participant?: Participants[]

  @OneToMany(() => ScheduledMeetings, (scheduledMeeting) => scheduledMeeting.user)
  scheduledMeeting?: ScheduledMeetings[]

  @OneToMany(() => Messages, (message) => message.user)
  message?: Messages[]
}
