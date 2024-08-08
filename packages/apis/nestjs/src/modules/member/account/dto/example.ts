export const account = {
  key: 'exp',
  status: 'enable',
  name: '成长值',
  value: 1000,
}

export const member = {
  status: 'normal',
  source: 'manual',
  cardNo: '1234567890',
  avatar: 'https://i.pravatar.cc/300',
  username: 'username',
  nickname: 'nickname',
  mobile: '1450000009',
  birthday: '2000-01-01',
  gender: 'unknown',
  location: '11,1100',
  lastLoginTime: '2020-01-01 00:00:00',
  account: [
    { key: 'orders', name: '订单数', value: 0 },
    { key: 'order_amount', name: '消费金额', value: 0 },
    { key: 'exp', name: '成长值', value: 0 },
    { key: 'points', name: '积分', value: 0 },
    { key: 'balance', name: '余额', value: 0 },
    { key: 'sign_in', name: '签到', value: 0 },
    { key: 'red_packet', name: '红包', value: 0 },
    { key: 'coupon', name: '优惠券', value: 0 },
  ],
  accountRecord: {
    orders: { key: 'orders', name: '订单数', value: 0 },
    order_amount: { key: 'order_amount', name: '消费金额', value: 0 },
    exp: { key: 'exp', name: '成长值', value: 0 },
    points: { key: 'points', name: '积分', value: 0 },
    balance: { key: 'balance', name: '余额', value: 0 },
    sign_in: { key: 'sign_in', name: '签到', value: 0 },
    red_packet: { key: 'red_packet', name: '红包', value: 0 },
    coupon: { key: 'coupon', name: '优惠券', value: 0 },
  },
  tag: { id: 1, name: 'tag' },
  group: { id: 1, name: 'group' },
  bindInfo: {
    id: 1,
    cardId: 1,
    cardPlanId: 1,
    name: 'Member Level 0',
    type: 'custom',
    badgeStyles: {
      icon: 'icon',
      textColor: '#000000',
      bgColor: '#ffffff',
    },
  },
  card: {
    id: 1,
    memberId: 1,
    cardId: 1,
    cardPlanId: 1,
    key: 'lv0',
    name: 'Member Level 0',
    desc: 'Member Level 0',
    type: 'level',
    planType: 'times',
    discount: 0,
    pointsRatio: 0,
    isFreeShipping: 'Y',
    isUpgradeable: 'Y',
    needExp: 100,
    nextNeedExp: 200,
    times: 1,
    cardStyles: {
      icon: 'icon',
      textColor: '#000000',
      bgColor: '#ffffff',
      bgImage: 'https://i.pravatar.cc/300',
    },
    badgeStyles: {
      icon: 'icon',
      textColor: '#000000',
      bgColor: '#ffffff',
    },
    dueTime: 1131221213,
    createdTime: '2022-01-01 00:00:00',
  },
}
