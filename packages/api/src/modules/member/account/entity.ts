import {
  type ILocationPath,
  type IMemberAccount,
  type IMemberGender,
  type IMemberSource,
  type IMemberStatus,
  MemberGender,
  MemberSource,
  MemberStatus,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { MemberBinding } from '@/member/binding/entity'
import { MemberGroup } from '@/member/group/entity'
import { MemberTag } from '@/member/tag/entity'

@Entity('shop_member_account', {
  comment: '会员账户信息表',
})
@Index('IDX_shop_member_account', ['status', 'username', 'updatedTime'])
export class MemberAccount implements IMemberAccount {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberStatus.NORMAL, comment: '状态' })
  status: IMemberStatus

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberSource.WECHAT_MP, comment: '来源' })
  source: IMemberSource

  @Column({ name: 'group_id', type: 'int', unsigned: true, default: 0, comment: '群体 ID' })
  groupId: number

  @OneToOne(() => MemberGroup, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'group_id' })
  group: MemberGroup

  @ManyToMany(() => MemberTag, { createForeignKeyConstraints: false })
  @JoinTable({ name: 'shop_member_has_tags', joinColumn: { name: 'member_id' }, inverseJoinColumn: { name: 'tag_id' } })
  tags: MemberTag[]

  @Column({ name: 'card_id', type: 'int', unsigned: true, default: 0, comment: '会员绑定 ID' })
  cardId: number

  @OneToOne(() => MemberBinding, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'card_id' })
  card: MemberBinding

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

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '会员密码盐值' })
  salt: string

  @Column({ type: 'date', default: null, comment: '会员生日' })
  birthday: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberGender.UNKNOWN, comment: '会员性别' })
  gender: IMemberGender

  @Column({ type: 'simple-json', default: null, comment: '注册城市' })
  location: ILocationPath

  @Column({ type: 'int', unsigned: true, default: 0, comment: '会员成长值' })
  exp: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '会员积分' })
  points: number

  @Column({ type: 'float', unsigned: true, default: 0, comment: '账户余额' })
  balance: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '订单数' })
  orders: number

  @Column({ name: 'order_amount', type: 'float', unsigned: true, default: 0, comment: '消费金额' })
  orderAmount: number

  @Column({ name: 'sign_in_times', type: 'int', unsigned: true, default: 0, comment: '签到次数' })
  signInTimes: number

  @Column({ name: 'login_times', type: 'int', unsigned: true, default: 0, comment: '登录次数' })
  loginTimes: number

  @Column({ name: 'red_packet', type: 'int', unsigned: true, default: 0, comment: '红包数量' })
  redPacket: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '优惠券数量' })
  coupon: number

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string

  @Column({ name: 'locked_time', type: 'datetime', default: null, comment: '锁定时间' })
  lockedTime: string

  @Column({ name: 'last_order_time', type: 'datetime', default: null, comment: '最后消费时间' })
  lastOrderTime: string

  @Column({ name: 'last_sign_in_time', type: 'datetime', default: null, comment: '最后签到时间' })
  lastSignInTime: string

  @Column({ name: 'last_login_time', type: 'datetime', default: null, comment: '最后登录时间' })
  lastLoginTime: string
}
