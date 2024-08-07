import type {
  ILocationPath,
  IMember,
  IMemberAccountDict,
  IMemberCardBinding,
  IMemberGender,
  IMemberGroupDict,
  IMemberListItem,
  IMemberProfile,
  IMemberSource,
  IMemberStatus,
  IMemberTagDict,
} from '@xiaoshop/schema'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { member } from '../example'

/**
 * 会员信息响应 DTO
 */
export class MemberResponse implements Omit<IMember, 'password' | 'salt'> {
  @ApiProperty({ description: '会员 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '会员状态', example: member.status })
  readonly status: IMemberStatus

  @ApiProperty({ description: '注册来源', example: member.source })
  readonly source: IMemberSource

  @ApiProperty({ description: '会员账户', example: member.account })
  readonly account: IMemberAccountDict[]

  @ApiProperty({ description: '会员分组', example: member.group })
  readonly group: IMemberGroupDict

  @ApiProperty({ description: '会员标签', example: [member.tag] })
  readonly tags: IMemberTagDict[]

  @ApiProperty({ description: '绑定会员卡', example: member.binding })
  readonly card: IMemberCardBinding

  @ApiProperty({ description: '会员卡号', example: member.cardNo })
  readonly cardNo: string

  @ApiProperty({ description: '会员头像', example: member.avatar })
  readonly avatar: string

  @ApiProperty({ description: '会员账号', example: member.username })
  readonly username: string

  @ApiProperty({ description: '会员昵称', example: member.nickname })
  readonly nickname: string

  @ApiProperty({ description: '会员手机号', example: member.mobile })
  readonly mobile: string

  @ApiProperty({ description: '会员生日', example: member.birthday })
  readonly birthday: string

  @ApiProperty({ description: '会员性别', example: member.gender })
  readonly gender: IMemberGender

  @ApiProperty({ description: '会员地址', example: member.location })
  readonly location: ILocationPath

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string

  @ApiProperty({ description: '更新时间' })
  readonly lastLoginTime: string
}

/**
 * 会员列表响应 DTO
 */
export class MemberListResponse
  extends PickType(MemberResponse, [
    'id',
    'status',
    'source',
    'tags',
    'group',
    'account',
    'card',
    'cardNo',
    'avatar',
    'username',
    'nickname',
    'mobile',
    'gender',
    'location',
    'lastLoginTime',
  ] as const)
  implements IMemberListItem {}

/**
 * 会员资料响应 DTO
 */
export class MemberProfileResponse
  extends PickType(MemberResponse, [
    'id',
    'status',
    'source',
    'tags',
    'group',
    'card',
    'cardNo',
    'avatar',
    'username',
    'nickname',
    'mobile',
    'birthday',
    'gender',
    'location',
    'createdTime',
    'lastLoginTime',
  ] as const)
  implements IMemberProfile {}
