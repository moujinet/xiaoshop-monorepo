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
  tag: { id: 1, name: 'tag' },
  group: { id: 1, name: 'group' },
  binding: {
    id: 1,
    card: {
      id: 1,
      type: 'level',
      isEnabled: 'Y',
      key: 'lv0',
      name: 'Member Level 0',
      desc: 'Member Level 0',
      styles: {
        icon: 'icon',
        textColor: '#000000',
        bgColor: '#ffffff',
        bgImage: 'https://i.pravatar.cc/300',
      },
      needExp: 0,
      discount: 0,
      pointsRatio: 0,
      isFreeShipping: 'Y',
    },
    plan: {
      id: 1,
      type: 'times',
      duration: 0,
      price: 1900,
    },
    times: 0,
    dueTime: '2022-01-01 00:00:00',
    createdTime: '2022-01-01 00:00:00',
  },
}
