export const plan = {
  id: 1,
  type: 1,
  due: 0,
  price: 1900,
}

export const card = {
  id: 1,
  type: 1,
  enable: 1,
  key: 'lv0',
  name: 'Member Level 0',
  desc: 'Member Level 0',
  badgeStyle: {
    icon: 'icon',
    textColor: '#000000',
    bgColor: '#ffffff',
  },
  cardStyle: {
    icon: 'icon',
    textColor: '#000000',
    bgColor: '#ffffff',
    bgImage: 'https://i.pravatar.cc/300',
  },
  plans: [
    plan,
  ],
  needExp: 0,
  discount: 0,
  pointsRatio: 0,
  freeShipping: 1,
}
