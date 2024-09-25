import type {
  ILocationPath,
  IMemberCardBindingInfo,
  IMemberGroupInfo,
  IMemberInfo,
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

import { MemberTag } from '../tag/entity'
import { MemberGroup } from '../group/entity'
import { MemberAccount } from '../account/account/entity'
import { MemberCardBinding } from '../card/binding/entity'

@Entity('member', {
  comment: '会员账户变更信息表',
})
@Index('IDX_member', ['status', 'source', 'nickname', 'mobile', 'gender', 'cardNo', 'groupId', 'signInCount', 'signInDays', 'loginCount'])
export class Member {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '会员状态' })
  status: MemberStatus

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '注册来源' })
  source: MemberSource

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员账号' })
  username: string

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '登录密码' })
  password: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '密码盐值' })
  salt: string

  @Column({ type: 'varchar', length: 16, nullable: false, default: '', comment: '会员昵称' })
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

  @Column({ name: 'invite_code', type: 'varchar', length: 16, nullable: false, default: '', comment: '邀请码' })
  inviteCode: string

  @Column({ name: 'invite_member_id', type: 'int', unsigned: true, default: 0, comment: '邀请会员 ID' })
  inviteMemberId: IMemberInfo['id']

  @Column({ name: 'card_no', type: 'varchar', length: 16, nullable: false, default: '', comment: '会员卡号' })
  cardNo: string

  @Column({ name: 'card_id', type: 'int', unsigned: true, default: 0, comment: '绑定会员卡 ID' })
  cardId: IMemberCardBindingInfo['id']

  @OneToOne(() => MemberCardBinding, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'card_id' })
  card: MemberCardBinding

  @Column({ name: 'group_id', type: 'int', unsigned: true, default: 0, comment: '会员群体 ID' })
  groupId: IMemberGroupInfo['id']

  @OneToOne(() => MemberGroup, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'group_id' })
  group: MemberGroup

  @ManyToMany(() => MemberTag, { createForeignKeyConstraints: false })
  @JoinTable({ name: 'member_has_tag', joinColumn: { name: 'member_id' }, inverseJoinColumn: { name: 'tag_id' } })
  tags: MemberTag[]

  @OneToMany(() => MemberAccount, account => account.member)
  account: MemberAccount[]

  @Column({ name: 'sign_in_count', type: 'int', unsigned: true, default: 0, comment: '累计签到次数' })
  signInCount: number

  @Column({ name: 'sign_in_days', type: 'int', unsigned: true, default: 0, comment: '连续签到天数' })
  signInDays: number

  @Column({ name: 'login_count', type: 'int', unsigned: true, default: 0, comment: '累计登录次数' })
  loginCount: number

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, update: false, comment: '注册时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string

  @Column({ name: 'last_login_time', type: 'datetime', default: null, comment: '最后登录时间' })
  lastLoginTime: string

  @Column({ name: 'last_order_time', type: 'datetime', default: null, comment: '最后消费时间' })
  lastOrderTime: string

  @Column({ name: 'last_sign_in_time', type: 'datetime', default: null, comment: '最后签到时间' })
  lastSignInTime: string
}
