import type {
  IAuthLog,
  IAuthLogType,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AuthUser } from '@/auth/user/entity'

@Entity('manage_auth_log', {
  comment: '员工操作日志表',
})
@Index('IDX_manage_auth_log', ['type', 'module', 'createdTime'])
export class AuthLog implements IAuthLog {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: 'manual', comment: '日志类型' })
  type: IAuthLogType

  @Column({ name: 'user_id', type: 'int', unsigned: true, nullable: false, default: 0, comment: '员工 ID' })
  userId: number

  @ManyToOne(() => AuthUser, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'user_id' })
  user: AuthUser

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '日志模块' })
  module: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '日志内容' })
  content: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '操作设备' })
  device: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '操作 IP' })
  ip: string

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string
}
