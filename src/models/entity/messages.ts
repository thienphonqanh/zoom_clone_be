import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreatedUpdated } from '~/common/createdUpdatedEntity'
import { Users } from './users'
import { Room } from './room'

@Entity()
export class Messages extends CreatedUpdated {
  @PrimaryGeneratedColumn()
  int?: number

  @Column({ type: 'text', nullable: false })
  content?: string

  @ManyToOne(() => Users, (user) => user.message)
  @JoinColumn({ name: 'user_id' })
  user?: Users

  @ManyToOne(() => Room, (room) => room.message)
  @JoinColumn({ name: 'room_id' })
  room?: Users
}
