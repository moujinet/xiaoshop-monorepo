import type { IMemberGroupFilter } from '@xiaoshop/shared'

import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('member_group', {
  comment: '会员群体表',
})
@Index('IDX_member_group', ['total', 'updatedTime'])
export class MemberGroup {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员群体名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '会员群体描述' })
  desc: string

  @Column({ type: 'simple-json', default: null, comment: '会员群体筛选条件' })
  filters: IMemberGroupFilter[]

  @Column({ type: 'int', unsigned: true, default: 0, comment: '会员群体人数' })
  total: number

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
