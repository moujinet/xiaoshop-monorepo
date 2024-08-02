export const plan = {
  id: 1,
  type: 'times',
  duration: 0,
  price: 1900,
}

export const card = {
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
  plans: [
    plan,
  ],
  needExp: 0,
  discount: 0,
  pointsRatio: 0,
  isFreeShipping: 'Y',
}
