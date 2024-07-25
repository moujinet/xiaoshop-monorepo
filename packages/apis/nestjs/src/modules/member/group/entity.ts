import type { IMemberGroup, IMemberGroupCondition } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('shop_member_group', {
  comment: '会员群体表',
  orderBy: {
    total: 'DESC',
  },
})
export class MemberGroup implements IMemberGroup {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_member_group' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '群体名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '群体描述' })
  desc: string

  @Column({ type: 'simple-json', default: null, comment: '群体条件' })
  conditions: IMemberGroupCondition[]

  @Column({ type: 'int', unsigned: false, default: 0, comment: '群体人数' })
  total: number

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string

  @Column({ name: 'refresh_time', type: 'datetime', default: null, comment: '刷新时间' })
  refreshTime: string
}
