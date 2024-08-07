import {
  type IStaffAccountInfo,
  type IStaffLog,
  type IStaffLogExtra,
  type IStaffLogType,
  StaffLogType,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Account } from '@/staffs/account/entity'

@Entity('manage_staff_log', {
  comment: '员工操作日志表',
})
@Index('IDX_manage_staff_log', ['type', 'createdTime'])
export class StaffLog implements IStaffLog {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_manage_staff_log' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: StaffLogType.OPERATE, comment: '日志类型' })
  type: IStaffLogType

  @ManyToOne(() => Account, { createForeignKeyConstraints: false })
  @JoinColumn()
  staff: IStaffAccountInfo

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '日志操作' })
  action: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '日志内容' })
  content: string

  @Column({ type: 'simple-json', default: null, comment: '额外信息' })
  extra: IStaffLogExtra

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string
}
