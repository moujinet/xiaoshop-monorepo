import type { IMemberTag } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('shop_member_tag', {
  comment: '会员标签表',
  orderBy: {
    createdTime: 'DESC',
  },
})
export class MemberTag implements IMemberTag {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_member_tag' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '标签名称' })
  name: string

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string
}
