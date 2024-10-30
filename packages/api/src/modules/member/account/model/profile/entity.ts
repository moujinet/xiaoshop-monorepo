import type {
  ILocationPath,
  MemberGender,
  MemberSource,
  MemberStatus,
} from '@xiaoshop/shared'

import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { MemberTagEntity } from '@/member/tag/model/entity'
import { MemberGroupEntity } from '@/member/group/model/entity'
import { MemberCardBindEntity } from '@/member/card/model/bind/entity'
import { MemberAccountEntity } from '@/member/account/model/account/entity'

@Entity('member_profile', {
  comment: '会员信息',
})
@Index('IDX_member_profile', ['status'])
export class MemberProfileEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '会员状态' })
  status: MemberStatus

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '注册来源' })
  source: MemberSource

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '会员账号' })
  username: string

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '登录密码' })
  password: string

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '密码盐值' })
  salt: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员昵称' })
  nickname: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '会员头像' })
  avatar: string

  @Column({ type: 'varchar', length: 16, nullable: false, default: '', comment: '会员手机号' })
  mobile: string

  @Column({ type: 'date', default: null, comment: '会员生日' })
  birthday: string

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '会员性别' })
  gender: MemberGender

  @Column({ type: 'simple-json', default: null, comment: '注册城市' })
  location: ILocationPath

  @Column({ name: 'invite_code', type: 'char', length: 8, nullable: false, default: '', comment: '邀请码' })
  inviteCode: string

  @OneToMany(() => MemberAccountEntity, account => account.member, { createForeignKeyConstraints: false })
  account: MemberAccountEntity[]

  @Column({ name: 'card_id', type: 'int', unsigned: true, default: 0, comment: '会员卡号' })
  cardId: number

  @OneToOne(() => MemberCardBindEntity, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'card_id' })
  card: MemberCardBindEntity

  @Column({ name: 'group_id', type: 'int', unsigned: true, default: 0, comment: '群体 ID' })
  groupId: number

  @OneToOne(() => MemberGroupEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'group_id' })
  group: MemberGroupEntity

  @ManyToMany(() => MemberTagEntity, { createForeignKeyConstraints: false })
  @JoinTable({ name: 'member_has_tags', joinColumn: { name: 'member_id' }, inverseJoinColumn: { name: 'tag_id' } })
  tags: MemberTagEntity[]

  @Column({ name: 'order_count', type: 'int', unsigned: true, default: 0, comment: '累计消费次数' })
  orderCount: number

  @Column({ name: 'order_amount', type: 'float', unsigned: true, default: 0, comment: '累计消费金额' })
  orderAmount: number

  @Column({ name: 'red_packet_count', type: 'int', unsigned: true, default: 0, comment: '红包数量' })
  redPacketCount: number

  @Column({ name: 'coupon_count', type: 'int', unsigned: true, default: 0, comment: '优惠券数量' })
  couponCount: number

  @Column({ name: 'check_in_times', type: 'int', unsigned: true, default: 0, comment: '累计签到次数' })
  checkInTimes: number

  @Column({ name: 'check_in_days', type: 'int', unsigned: true, default: 0, comment: '连续签到天数' })
  checkInDays: number

  @Column({ name: 'login_times', type: 'int', unsigned: true, default: 0, comment: '累计登录次数' })
  loginTimes: number

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '注册时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string

  @Column({ name: 'last_login_time', type: 'datetime', default: null, comment: '最后登录时间' })
  lastLoginTime: string

  @Column({ name: 'last_order_time', type: 'datetime', default: null, comment: '最后消费时间' })
  lastOrderTime: string

  @Column({ name: 'last_check_in_time', type: 'datetime', default: null, comment: '最后签到时间' })
  lastCheckInTime: string
}
