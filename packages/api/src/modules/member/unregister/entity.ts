import { Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('member_unregister', {
  comment: '会员注销信息表',
})
@Index('IDX_member_unregister', ['updatedTime'])
export class MemberUnregister {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number
}
