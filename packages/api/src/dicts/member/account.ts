import {
  ColorName,
  type IDict,
  MemberAccountChangeMethod,
  MemberGender,
  MemberSource,
  MemberStatus,
} from '@xiaoshop/shared'

/**
 * 会员状态 - 字典
 *
 * @see {@link MemberStatus}
 */
export const MEMBER_STATUSES: IDict[] = [
  { value: '正常', key: MemberStatus.NORMAL, color: ColorName.GREEN },
  { value: '锁定', key: MemberStatus.LOCKED, color: ColorName.RED },
  { value: '冻结', key: MemberStatus.BLOCKED, color: ColorName.GRAY },
]

/**
 * 会员注册来源 - 字典
 *
 * @see {@link MemberSource}
 */
export const MEMBER_SOURCES: IDict[] = [
  { value: '微信小程序', key: MemberSource.WECHAT_MP, color: ColorName.GRAY, icon: 'mingcute:wechat-miniprogram' },
  { value: '微信公众号', key: MemberSource.WECHAT_OA, color: ColorName.GREEN, icon: 'mingcute:wechat' },
  { value: '手机端', key: MemberSource.H5, color: ColorName.ARCOBLUE, icon: 'mingcute:cellphone' },
  { value: '后台创建', key: MemberSource.MANUAL, color: ColorName.ARCOBLUE, icon: 'mingcute:layout' },
  { value: '网页端', key: MemberSource.WEB, color: ColorName.ARCOBLUE, icon: 'mingcute:laptop' },
  { value: 'iOS APP', key: MemberSource.APP_IOS, color: ColorName.GRAY, icon: 'mingcute:apple' },
  { value: 'Android APP', key: MemberSource.APP_ANDROID, color: ColorName.CYAN, icon: 'mingcute:android-2' },
]

/**
 * 会员性别 - 字典
 *
 * @see {@link MemberGender}
 */
export const MEMBER_GENDERS: IDict[] = [
  { value: '保密', key: MemberGender.UNKNOWN, color: ColorName.GRAY, icon: '' },
  { value: '先生', key: MemberGender.MALE, color: ColorName.ARCOBLUE, icon: 'mingcute:male' },
  { value: '女士', key: MemberGender.FEMALE, color: ColorName.RED, icon: 'mingcute:female' },
]

/**
 * 会员账户变更类型 - 字典
 *
 * @see {@link MemberAccountChangeMethod}
 */
export const MEMBER_ACCOUNT_CHANGE_METHODS: IDict[] = [
  { value: '增加', key: MemberAccountChangeMethod.ADD },
  { value: '减少', key: MemberAccountChangeMethod.SUB },
]
