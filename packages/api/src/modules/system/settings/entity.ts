import { Column, Entity } from 'typeorm'

@Entity('system_settings', {
  comment: '系统设置表',
})
export class SystemSettings {
  @Column({ primary: true, type: 'varchar', length: 255, nullable: false, unique: true, default: '', comment: '设置名' })
  key: string

  @Column({ type: 'text', default: null, comment: '设置值' })
  value: string
}
