import {
  type ILocationPath,
  type IMember,
  type IMemberAccountDict,
  type IMemberCardBindingInfo,
  type IMemberGender,
  type IMemberGroupDict,
  type IMemberSource,
  type IMemberStatus,
  type IMemberTagDict,
  MemberGender,
  MemberSource,
  MemberStatus,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { MemberCardBinding } from '@/member/card/entities'
import { MemberAccount } from '@/member/account/entities'
import { MemberGroup } from '@/member/group/entity'
import { MemberTag } from '@/member/tag/entity'

@Entity('shop_member', {
  comment: '会员信息表',
})
@Index('idx_shop_member', ['status', 'lastLoginTime'])
export class Member implements IMember {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_member' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberStatus.NORMAL, comment: '会员状态' })
  status: IMemberStatus

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberSource.MANUAL, comment: '注册来源' })
  source: IMemberSource

  @Column({ name: 'card_no', type: 'varchar', length: 16, nullable: false, default: '', comment: '会员卡号' })
  cardNo: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '会员头像' })
  avatar: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员账号' })
  username: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员昵称' })
  nickname: string

  @Column({ type: 'varchar', length: 16, nullable: false, default: '', comment: '会员手机' })
  mobile: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '会员密码' })
  password: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员密码盐值' })
  salt: string

  @Column({ type: 'date', default: null, comment: '会员生日' })
  birthday: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberGender.UNKNOWN, comment: '会员性别' })
  gender: IMemberGender

  @Column({ type: 'simple-json', default: null, comment: '注册城市' })
  location: ILocationPath

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string

  @Column({ name: 'last_login_time', type: 'datetime', default: null, comment: '最后登录时间' })
  lastLoginTime: string

  @OneToMany(() => MemberAccount, account => account.member, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn()
  account: IMemberAccountDict[]

  @OneToOne(() => MemberCardBinding, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn()
  binding: IMemberCardBindingInfo

  @OneToOne(() => MemberGroup, { createForeignKeyConstraints: false })
  @JoinColumn()
  group: IMemberGroupDict

  @OneToOne(() => MemberTag, { createForeignKeyConstraints: false })
  @JoinColumn()
  tag: IMemberTagDict
}