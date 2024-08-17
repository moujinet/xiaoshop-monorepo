export default defineModule({
  id: 'member',
  space: 'shop',
  name: '会员',
  icon: 'mingcute:vip-1',
  desc: '会员管理',
  version: '1.0.0',
  sort: 3,
  menus: [
    {
      id: 'manage',
      name: '会员管理',
      icon: 'mingcute:group-2',
      children: [
        {
          id: 'account',
          name: '会员列表',
          children: [
            { id: 'index', name: '会员列表' },
            { id: 'profile', name: '会员资料' },
            { id: '#create', name: '新增会员' },
            { id: '#update', name: '编辑会员' },
            { id: '#delete', name: '删除会员' },
          ],
        },
        {
          id: 'group',
          name: '会员群体',
          children: [
            { id: 'index', name: '群体列表' },
            { id: '#create', name: '创建群体' },
            { id: '#update', name: '编辑群体' },
            { id: '#delete', name: '删除群体' },
          ],
        },
        {
          id: 'tag',
          name: '会员标签',
          children: [
            { id: 'index', name: '标签列表' },
            { id: '#create', name: '创建标签' },
            { id: '#update', name: '编辑标签' },
            { id: '#delete', name: '删除标签' },
          ],
        },
        {
          id: 'logout',
          name: '会员注销',
          children: [
            { id: 'index', name: '申请列表' },
            { id: '#process', name: '处理申请' },
          ],
        },
      ],
    },
    {
      id: 'card',
      name: '等级权益',
      icon: 'mingcute:medal',
      children: [
        {
          id: 'level',
          name: '会员等级',
          children: [
            { id: 'index', name: '等级列表' },
            { id: '#edit', name: '设置等级' },
            { id: '#enable', name: '启用等级' },
            { id: '#disable', name: '停用等级' },
          ],
        },
        {
          id: 'custom',
          name: '超级会员卡',
          children: [
            { id: 'index', name: '会员卡列表' },
            { id: '#create', name: '创建会员卡' },
            { id: '#update', name: '编辑会员卡' },
            { id: '#delete', name: '删除会员卡' },
          ],
        },
      ],
    },
    {
      id: 'points',
      name: '会员积分',
      icon: 'mingcute:coin',
      children: [
        {
          id: 'rule',
          name: '积分规则',
        },
        {
          id: 'logs',
          name: '积分明细',
        },
      ],
    },
    {
      id: 'settings',
      name: '模块设置',
      icon: 'mingcute:settings-6',
      children: [
        { id: 'register', name: '注册设置' },
        { id: 'logout', name: '注销设置' },
      ],
    },
  ],
})
