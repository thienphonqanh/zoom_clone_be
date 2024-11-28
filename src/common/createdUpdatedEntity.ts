import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm'

@Entity()
export class CreatedUpdated {
  @CreateDateColumn({ name: 'created_at', select: false })
  created_at?: Date

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updated_at?: Date
}
