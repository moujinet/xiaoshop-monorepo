import type {
  ILocationPath,
  IMember,
  IMemberAccountKeyValue,
  IMemberCardBinding,
  IMemberCardBindingInfo,
  IMemberGender,
  IMemberGroupDict,
  IMemberListItem,
  IMemberProfile,
  IMemberSource,
  IMemberStatus,
  IMemberTagDict,
} from '@xiaoshop/schema'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { profile } from './example'

/**
 * 会员信息响应 DTO
 */
export class MemberResponse implements Omit<IMember, 'password' | 'salt' | 'account' | 'updatedTime'> {
  @ApiProperty({ description: '会员 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '会员状态', example: profile.status })
  readonly status: IMemberStatus

  @ApiProperty({ description: '注册来源', example: profile.source })
  readonly source: IMemberSource

  @ApiProperty({ description: '会员分组', example: profile.group })
  readonly group: IMemberGroupDict

  @ApiProperty({ description: '会员标签', example: profile.tags })
  readonly tags: IMemberTagDict[]

  @ApiProperty({ description: '绑定会员卡', example: profile.card })
  readonly card: IMemberCardBinding

  @ApiProperty({ description: '会员卡号', example: profile.cardNo })
  readonly cardNo: string

  @ApiProperty({ description: '会员头像', example: profile.avatar })
  readonly avatar: string

  @ApiProperty({ description: '会员账号', example: profile.username })
  readonly username: string

  @ApiProperty({ description: '会员昵称', example: profile.nickname })
  readonly nickname: string

  @ApiProperty({ description: '会员手机号', example: profile.mobile })
  readonly mobile: string

  @ApiProperty({ description: '会员生日', example: profile.birthday })
  readonly birthday: string

  @ApiProperty({ description: '会员性别', example: profile.gender })
  readonly gender: IMemberGender

  @ApiProperty({ description: '会员地址', example: profile.location })
  readonly location: ILocationPath

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

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
    'cardNo',
    'avatar',
    'username',
    'nickname',
    'mobile',
    'gender',
    'location',
    'lastLoginTime',
  ] as const)
  implements IMemberListItem {
  @ApiProperty({ description: '会员账户', example: profile.account })
  readonly account: IMemberAccountKeyValue

  @ApiProperty({ description: '会员账户', example: profile.bindInfo })
  readonly card: IMemberCardBindingInfo
}

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
