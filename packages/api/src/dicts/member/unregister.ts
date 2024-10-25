import {
  ColorName,
  type IDict,
  MemberUnregisterStatus,
} from '@xiaoshop/shared'

/**
 * 会员注销申请状态 - 字典
 *
 * @see {@link MemberUnregisterStatus}
 */
export const MEMBER_UNREGISTER_STATUSES: IDict[] = [
  { value: '待处理', key: MemberUnregisterStatus.PENDING, color: ColorName.ARCOBLUE },
  { value: '已通过', key: MemberUnregisterStatus.APPROVED, color: ColorName.ORANGERED },
  { value: '已拒绝', key: MemberUnregisterStatus.REJECTED, color: ColorName.RED },
  { value: '已注销', key: MemberUnregisterStatus.FINISHED, color: ColorName.GRAY },
]
