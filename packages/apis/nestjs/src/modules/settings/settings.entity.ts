import type { ISettings } from '@xiaoshop/schema'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('manage_settings', {
  comment: '系统设置表',
  orderBy: {
    key: 'ASC',
  },
})
export class Settings implements ISettings {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_manage_settings' })
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true, default: '', comment: '设置项键名' })
  key: string

  @Column({ type: 'text', comment: '设置项键值' })
  value: string
}
