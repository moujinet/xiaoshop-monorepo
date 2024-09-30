import type { ILocationPath, LogisticAddressOwner, LogisticAddressType, YesOrNo } from '@xiaoshop/shared'

import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('logistic_address', {
  comment: '收货地址表',
})
@Index('IDX_logistic_address', ['owner', 'type', 'memberId', 'isDefault', 'updatedTime'])
export class LogisticAddressEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: number

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '地址归属' })
  owner: LogisticAddressOwner

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '地址类型' })
  type: LogisticAddressType

  @Column({ name: 'is_default', type: 'tinyint', unsigned: true, default: 0, comment: '是否默认' })
  isDefault: YesOrNo

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '联系人' })
  name: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '联系人手机' })
  mobile: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '座机号码' })
  landline: string

  @Column({ type: 'simple-json', default: null, comment: '所在城市' })
  location: ILocationPath

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '详细地址' })
  address: string

  @Column({ name: 'postal_code', type: 'char', length: 6, nullable: false, default: '', comment: '邮政编码' })
  postalCode: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
