import type { IEnabled, IMemberAddress } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('shop_member_address', {
  comment: '会员地址表',
})
@Index('idx_shop_member_address', ['isDefault', 'updatedTime'])
export class MemberAddress implements IMemberAddress {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_member_address' })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: number

  @Column({ name: 'contract_name', type: 'varchar', length: 32, nullable: false, default: '', comment: '联系人' })
  contractName: string

  @Column({ type: 'varchar', length: 16, nullable: false, default: '', comment: '手机号' })
  mobile: string

  @Column({ type: 'simple-json', default: null, comment: '城市' })
  location: string[]

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '详细地址' })
  address: string

  @Column({ name: 'post_code', type: 'varchar', length: 8, nullable: false, default: '', comment: '邮政编码' })
  postCode: string

  @Column({ name: 'is_default', type: 'char', nullable: false, default: '', comment: '是否默认 (N:否 Y:是)' })
  isDefault: IEnabled

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
