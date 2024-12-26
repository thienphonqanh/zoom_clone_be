import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CreatedUpdated } from '~/common/createdUpdatedEntity'
import { Users } from './users'
import { ScheduledMeetings } from './scheduledMeetings'

@Entity()
export class Rooms extends CreatedUpdated {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ nullable: false })
  name?: string

  @Column({ nullable: false })
  is_active?: boolean

  @ManyToOne(() => Users, (user) => user.room)
  @JoinColumn({ name: 'userId' })
  user?: number

  @OneToMany(() => ScheduledMeetings, (scheduledMeeting) => scheduledMeeting.room)
  scheduledMeeting?: ScheduledMeetings[]
}
