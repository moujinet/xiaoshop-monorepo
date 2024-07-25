import { MemberPointsRuleKeyEnum } from '@xiaoshop/schema'

export const example = {
  key: MemberPointsRuleKeyEnum.BIRTHDAY,
  status: 'Y',
  name: '生日有礼',
  desc: '会员生日赠送积分',
  icon: 'http://xiao.shop/images/points/1.png',
  options: {
    points: 100,
    limit: 100,
    ratio: 1,
    perWeekRatio: 1,
    perMonthRatio: 1,
  },
}
