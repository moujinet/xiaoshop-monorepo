import type { ISettingOption } from '@xiaoshop/shared'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('manage_settings', {
  comment: '系统设置表',
})
@Index('IDX_manage_settings', ['key'], { unique: true })
export class SettingOption implements ISettingOption {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_manage_settings' })
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true, default: '', comment: '设置名' })
  key: string

  @Column({ type: 'text', default: null, comment: '设置值' })
  value: string
}
