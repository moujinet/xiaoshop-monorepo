import {
  type IDict,
  MemberAccountChangeMethod,
} from '@xiaoshop/shared'

/**
 * 会员账户变更类型 - 字典
 *
 * @see {@link MemberAccountChangeMethod}
 */
export const MEMBER_ACCOUNT_CHANGE_METHODS: IDict[] = [
  { value: '增加', key: MemberAccountChangeMethod.ADD },
  { value: '减少', key: MemberAccountChangeMethod.SUB },
  { value: '设置', key: MemberAccountChangeMethod.SET },
]
