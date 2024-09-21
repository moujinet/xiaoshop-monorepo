import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'system_monitor_cron',
  comment: '系统定时任务信息',
})
@Index('IDX_system_monitor_cron', ['key', 'lastExecTime'])
export class SystemMonitorCron {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, unique: true, default: '', comment: '任务标识' })
  key: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '所在模块' })
  module: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '任务名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '任务描述' })
  desc: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '定时时间' })
  cron: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '最后执行结果' })
  result: string

  @UpdateDateColumn({ name: 'last_exec_time', type: 'datetime', default: null, comment: '最后执行时间' })
  lastExecTime: string
}
