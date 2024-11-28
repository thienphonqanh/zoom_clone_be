import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Room } from './room'
import { Users } from './users'
import { CreatedUpdated } from '~/common/createdUpdatedEntity'

@Entity()
export class Participants extends CreatedUpdated {
  @PrimaryGeneratedColumn()
  id?: number

  @CreateDateColumn()
  joined_at?: Date

  @ManyToOne(() => Room, (room) => room.participant)
  @JoinColumn({ name: 'room_id' })
  room?: Room

  @ManyToOne(() => Users, (user) => user.participant)
  @JoinColumn({ name: 'user_id' })
  user?: Users
}
