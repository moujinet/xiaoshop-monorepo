export default defineModule({
  id: 'auth',
  space: 'manage',
  name: '权限',
  icon: 'mingcute:safe-lock',
  desc: '权限配置',
  version: '1.0.0',
  sort: 1,
  menus: [
    {
      id: 'manage',
      name: '员工管理',
      icon: 'mingcute:user-security',
      children: [
        {
          id: 'staffs',
          name: '员工管理',
          children: [
            { id: '#index', name: '员工列表' },
            { id: '#create', name: '创建员工' },
            { id: '#edit', name: '编辑员工' },
            { id: '#delete', name: '删除员工' },
          ],
        },
        {
          id: 'roles',
          name: '角色管理',
          children: [
            { id: 'index', name: '角色列表' },
            { id: 'create', name: '创建角色' },
            { id: 'edit', name: '编辑角色' },
            { id: '#delete', name: '删除角色' },
          ],
        },
      ],
    },
    {
      id: 'organize',
      name: '组织管理',
      icon: 'mingcute:sitemap',
      children: [
        {
          id: 'departments',
          name: '部门管理',
          children: [
            { id: '#index', name: '部门列表' },
            { id: '#create', name: '创建部门' },
            { id: '#edit', name: '编辑部门' },
            { id: '#delete', name: '删除部门' },
          ],
        },
        {
          id: 'positions',
          name: '职位管理',
          children: [
            { id: '#index', name: '职位列表' },
            { id: '#create', name: '创建职位' },
            { id: '#edit', name: '编辑职位' },
            { id: '#delete', name: '删除职位' },
          ],
        },
      ],
    },
    {
      id: 'logs',
      name: '操作日志',
      icon: 'mingcute:to-do',
    },
  ],
})
