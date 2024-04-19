export default defineModule({
  id: 'goods',
  space: 'shop',
  name: '商品',
  icon: 'ph:package',
  desc: '商品管理',
  version: '1.0.0',
  sort: 1,
  menus: [
    {
      id: 'manage',
      name: '商品管理',
      icon: 'ph:package',
      children: [
        {
          id: 'list',
          name: '商品列表',
          children: [
            { id: 'index', name: '商品列表' },
            { id: 'create', name: '发布商品' },
            { id: 'edit', name: '编辑商品' },
            { id: 'history', name: '浏览记录' },
            { id: 'comments', name: '评价' },
            { id: '#export', name: '导出商品' },
            { id: '#delete', name: '删除商品' },
            { id: '#in-stock', name: '上架商品' },
            { id: '#sold-out', name: '下架商品' },
          ],
        },
        {
          id: 'category',
          name: '商品分类',
          children: [
            { id: '#create', name: ' 创建分类' },
            { id: '#edit', name: ' 编辑分类' },
            { id: '#delete', name: ' 删除分类' },
          ],
        },
        {
          id: 'group',
          name: '商品分组',
          children: [
            { id: '#create', name: ' 创建分组' },
            { id: '#edit', name: ' 编辑分组' },
            { id: '#delete', name: ' 删除分组' },
          ],
        },
        {
          id: 'tags',
          name: '商品标签',
          children: [
            { id: '#create', name: ' 创建标签' },
            { id: '#edit', name: ' 编辑标签' },
            { id: '#delete', name: ' 删除标签' },
          ],
        },
        {
          id: 'attributes',
          name: '商品参数',
          children: [
            { id: 'index', name: '模板列表' },
            { id: 'template', name: '模板设置' },
          ],
        },
        {
          id: 'brand',
          name: '商品品牌',
          children: [
            { id: '#create', name: ' 创建品牌' },
            { id: '#edit', name: ' 编辑品牌' },
            { id: '#delete', name: ' 删除品牌' },
          ],
        },
        {
          id: 'services',
          name: '附加服务',
          children: [
            { id: '#create', name: ' 创建分类' },
            { id: '#edit', name: ' 编辑分类' },
            { id: '#delete', name: ' 删除分类' },
          ],
        },
        { id: 'guarantee', name: '服务保障' },
        {
          id: 'recycle',
          name: '回收站',
          children: [
            { id: '#clean', name: '清空回收站' },
          ],
        },
      ],
    },
    {
      id: 'tools',
      name: '商品工具',
      icon: 'ph:wrench',
      children: [
        { id: 'import', name: '导入商品' },
        { id: 'clawer', name: '商品采集' },
      ],
    },
    {
      id: 'settings',
      name: '相关设置',
      icon: 'ph:gear-six',
      children: [
        { id: 'preference', name: '显示设置' },
        { id: 'clawer', name: '采集设置' },
        {
          id: 'delivery',
          name: '物流设置',
          children: [
            {
              id: 'express',
              name: '快递公司',
            },
            {
              id: 'city-heros',
              name: '配送员',
            },
          ],
        },
      ],
    },
  ],
})
