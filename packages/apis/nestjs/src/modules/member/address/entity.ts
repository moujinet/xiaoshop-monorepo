import {
  Enabled,
  type IEnabled,
  type ILocationPath,
  type IMemberAddress,
  type IMemberProfile,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Member } from '@/member/account/entities'

@Entity('shop_member_address', {
  comment: '会员地址表',
})
@Index('IDX_shop_member_address', ['isDefault', 'updatedTime'])
export class MemberAddress implements IMemberAddress {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_shop_member_address' })
  id: number

  @Column({ name: 'contract_name', type: 'varchar', length: 32, nullable: false, default: '', comment: '联系人' })
  contractName: string

  @Column({ type: 'varchar', length: 16, nullable: false, default: '', comment: '手机号' })
  mobile: string

  @Column({ type: 'simple-json', default: null, comment: '城市' })
  location: ILocationPath

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '详细地址' })
  address: string

  @Column({ name: 'post_code', type: 'varchar', length: 8, nullable: false, default: '', comment: '邮政编码' })
  postCode: string

  @Column({ name: 'is_default', type: 'char', length: 1, nullable: false, default: Enabled.NO, comment: '是否默认 (N:否 Y:是)' })
  isDefault: IEnabled

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string

  @OneToOne(() => Member, { createForeignKeyConstraints: false })
  @JoinColumn()
  member: IMemberProfile
}
