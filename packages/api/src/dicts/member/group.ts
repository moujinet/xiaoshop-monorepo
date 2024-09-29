import {
  type IDict,
  MemberGroupFilterKey,
  MemberGroupFilterOperator,
} from '@xiaoshop/shared'

/**
 * 会员群体筛选条件项 - 字典
 *
 * @see {@link MemberGroupFilterKey}
 */
export const MEMBER_GROUP_FILTER_KEYS: IDict[] = [
  { value: '注册来源', key: MemberGroupFilterKey.SOURCE },
  { value: '会员状态', key: MemberGroupFilterKey.STATUS },
  { value: '会员等级', key: MemberGroupFilterKey.CARD },
  { value: '会员标签', key: MemberGroupFilterKey.TAG },
  { value: '会员性别', key: MemberGroupFilterKey.GENDER },
  { value: '会员生日', key: MemberGroupFilterKey.BIRTHDAY },
  { value: '注册时间', key: MemberGroupFilterKey.CREATED_TIME },
  { value: '当前积分', key: MemberGroupFilterKey.POINTS },
  { value: '当前成长值', key: MemberGroupFilterKey.EXP },
  { value: '累计签到数', key: MemberGroupFilterKey.SIGN_IN },
  { value: '累计订单数', key: MemberGroupFilterKey.ORDER_COUNT },
  { value: '累计订单金额', key: MemberGroupFilterKey.ORDER_AMOUNT },
]

/**
 * 会员群体筛选条件操作符 - 字典
 *
 * @see {@link MemberGroupFilterOperator}
 */
export const MEMBER_GROUP_FILTER_OPERATORS: IDict[] = [
  { value: '包含', key: MemberGroupFilterOperator.IN },
  { value: '排除', key: MemberGroupFilterOperator.NOT_IN },
]
