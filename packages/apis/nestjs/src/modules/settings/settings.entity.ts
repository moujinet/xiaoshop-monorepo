import type { ISettings } from '@xiaoshop/schema'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('manage_settings', {
  comment: '系统设置表',
})
export class Settings implements ISettings {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_manage_settings' })
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true, default: '', comment: '设置项键名' })
  key: string

  @Column({ type: 'text', default: null, comment: '设置项键值' })
  value: string
}
