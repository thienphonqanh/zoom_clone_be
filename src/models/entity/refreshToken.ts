import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { Users } from './users'
import { CreatedUpdated } from '../../common/createdUpdatedEntity'

@Entity()
export class RefreshToken extends CreatedUpdated {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ nullable: false })
  token?: string

  @OneToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user?: Users
}
