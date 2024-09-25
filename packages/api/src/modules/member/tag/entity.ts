import type { IColorName } from '@xiaoshop/shared'

import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('member_tag', {
  comment: '会员标签表',
})
@Index('IDX_member_tag', ['updatedTime'])
export class MemberTag {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员标签名称' })
  name: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员标签颜色' })
  color: IColorName

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
