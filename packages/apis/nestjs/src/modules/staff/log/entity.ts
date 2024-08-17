import type {
  IStaffAccountInfo,
  IStaffLog,
  IStaffLogExtra,
  IStaffLogType,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { StaffAccount } from '@/staff/account/entity'

@Entity('manage_staff_log', {
  comment: '员工操作日志表',
})
@Index('IDX_manage_staff_log', ['type', 'createdTime'])
export class StaffLog implements IStaffLog {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_manage_staff_log' })
  id: number

  @Column({ name: 'staff_id', type: 'int', unsigned: true, nullable: false, default: 0, comment: '员工 ID' })
  staffId: number

  @ManyToOne(() => StaffAccount, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'staff_id' })
  staff: IStaffAccountInfo

  @Column({ type: 'varchar', length: 32, nullable: false, default: 'manual', comment: '日志类型' })
  type: IStaffLogType

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '日志模块' })
  module: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '日志内容' })
  content: string

  @Column({ type: 'simple-json', default: null, comment: '额外信息' })
  extra: IStaffLogExtra

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string
}
