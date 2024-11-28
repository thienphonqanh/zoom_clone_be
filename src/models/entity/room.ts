import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CreatedUpdated } from '~/common/createdUpdatedEntity'
import { Users } from './users'
import { Participants } from './participants'
import { ScheduledMeetings } from './scheduledMeetings'
import { Messages } from './messages'

@Entity()
export class Room extends CreatedUpdated {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ nullable: false })
  name?: string

  @Column({ nullable: false })
  is_active?: boolean

  @ManyToOne(() => Users, (user) => user.room)
  @JoinColumn({ name: 'userId' })
  user?: number

  @OneToMany(() => Participants, (participants) => participants.room)
  participant?: Participants[]

  @OneToMany(() => ScheduledMeetings, (scheduledMeeting) => scheduledMeeting.room)
  scheduledMeeting?: ScheduledMeetings[]

  @OneToMany(() => Messages, (message) => message.room)
  message?: Messages[]
}
