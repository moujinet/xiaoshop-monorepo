export default defineModule({
  id: 'assets',
  space: 'app',
  name: '素材',
  icon: 'mingcute:photo-album',
  desc: '设计素材',
  version: '1.0.0',
  sort: 99,
  menus: [
    {
      id: 'manage',
      name: '素材管理',
      icon: 'mingcute:mountain-2',
      children: [
        {
          id: 'images',
          name: '图片素材',
          children: [
            { id: 'index', name: '图片列表' },
            { id: '#upload', name: '上传图片' },
            { id: '#delete', name: '删除图片' },
            { id: '#group', name: '图片分组' },
          ],
        },
        {
          id: 'videos',
          name: '视频素材',
          children: [
            { id: 'index', name: '视频列表' },
            { id: '#upload', name: '上传视频' },
            { id: '#delete', name: '删除视频' },
            { id: '#group', name: '视频分组' },
          ],
        },
        {
          id: 'icons',
          name: '图标素材',
          children: [
            { id: 'index', name: '图标列表' },
            { id: '#upload', name: '上传图标' },
            { id: '#delete', name: '删除图标' },
            { id: '#group', name: '图标分组' },
          ],
        },
      ],
    },
    {
      id: 'settings',
      name: '模块设置',
      icon: 'mingcute:settings-6',
      children: [
        { id: 'upload', name: '上传设置' },
        { id: 'images', name: '图片处理' },
        { id: 'cloud', name: '云存储' },
      ],
    },
  ],
})
