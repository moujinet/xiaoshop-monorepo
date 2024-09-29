import type { SystemLogLevel, SystemLogType } from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { SystemUserEntity } from '@/system/auth/user/entity'

@Entity({
  name: 'system_log',
  comment: '系统日志表',
})
@Index('IDX_system_log', ['type', 'level', 'module', 'userId', 'createdTime'])
export class SystemLogEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '日志类型' })
  type: SystemLogType

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '日志级别' })
  level: SystemLogLevel

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '日志模块' })
  module: string

  @Column({ name: 'user_id', type: 'int', unsigned: true, default: 0, comment: '操作用户 ID' })
  userId: number

  @ManyToOne(() => SystemUserEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'user_id' })
  user: SystemUserEntity

  @Column({ type: 'text', default: null, comment: '日志内容' })
  content: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '操作设备' })
  device: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '操作 IP' })
  ip: string

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '操作时间' })
  createdTime: string
}
