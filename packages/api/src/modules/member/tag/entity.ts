import type {
  IColorName,
  IMemberTag,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('shop_member_tag', {
  comment: '会员标签表',
})
@Index('IDX_shop_member_tag', ['updatedTime'])
export class MemberTag implements IMemberTag {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '名称' })
  name: string

  @Column({ type: 'varchar', length: 16, nullable: false, default: '', comment: '颜色' })
  color: IColorName

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, update: false, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
