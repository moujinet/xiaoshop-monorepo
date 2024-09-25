import type { IMemberInfo } from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('member_invite', {
  comment: '会员邀请记录表',
})
@Index('IDX_member_invite', ['memberId', 'createdTime'])
export class MemberInvite {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: IMemberInfo['id']

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员昵称' })
  nickname: IMemberInfo['nickname']

  @Column({ name: 'invited_member_id', type: 'int', unsigned: true, default: 0, comment: '受邀会员 ID' })
  invitedMemberId: IMemberInfo['id']

  @Column({ name: 'invited_nickname', type: 'varchar', length: 32, nullable: false, default: '', comment: '受邀会员昵称' })
  invitedNickname: IMemberInfo['nickname']

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, comment: '邀请时间' })
  createdTime: string
}
