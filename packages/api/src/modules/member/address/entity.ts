import {
  type ILocationPath,
  type IMemberAddress,
  type IYesOrNo,
  YesOrNo,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { MemberAccount } from '@/member/account/entity'

@Entity('shop_member_address', {
  comment: '会员收货地址表',
})
@Index('IDX_shop_member_address', ['memberId', 'isDefault', 'updatedTime'])
export class MemberAddress implements IMemberAddress {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: number

  @OneToOne(() => MemberAccount, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'member_id' })
  member: MemberAccount

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '联系人' })
  name: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '联系人手机' })
  mobile: string

  @Column({ type: 'simple-json', default: null, comment: '城市' })
  location: ILocationPath

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '详细地址' })
  address: string

  @Column({ name: 'postal_code', type: 'varchar', length: 16, nullable: false, default: '', comment: '邮政编码' })
  postalCode: string

  @Column({ name: 'is_default', type: 'char', length: 1, nullable: false, default: YesOrNo.NO, comment: '是否默认 (N:否 Y:是)' })
  isDefault: IYesOrNo

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, update: false, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
