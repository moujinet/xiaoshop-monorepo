export const routes = [
  {
    path: '/editor',
    children: [
      {
        path: '',
        children: [
          {
            path: 'pages',
            children: [
              {
                path: 'home',
                name: '/editor/pages/home',
              },
            ],
          },
        ],
      },
    ],
    meta: {
      isLayout: true,
    },
  },
  {
    path: '/goods',
    children: [
      {
        path: '',
        children: [
          {
            path: 'manage',
            children: [
              {
                path: 'attributes',
                children: [
                  {
                    path: '',
                    name: '/goods/manage/attributes/',
                  },
                  {
                    path: 'template',
                    name: '/goods/manage/attributes/template',
                  },
                ],
              },
              {
                path: 'brand',
                name: '/goods/manage/brand',
              },
              {
                path: 'category',
                name: '/goods/manage/category',
              },
              {
                path: 'list',
                children: [
                  {
                    path: '',
                    name: '/goods/manage/list/',
                  },
                  {
                    path: 'history',
                    name: '/goods/manage/list/history',
                  },
                ],
              },
              {
                path: 'recycle',
                name: '/goods/manage/recycle',
              },
              {
                path: 'tags',
                name: '/goods/manage/tags',
              },
            ],
          },
          {
            path: 'settings',
            children: [
              {
                path: 'options',
                name: '/goods/settings/options',
              },
              {
                path: 'services',
                name: '/goods/settings/services',
              },
            ],
          },
        ],
      },
    ],
    meta: {
      isLayout: true,
    },
  },
  {
    path: '/settings',
    children: [
      {
        path: '',
        children: [
          {
            path: 'areas',
            children: [
              {
                path: '',
                name: '/settings/areas/',
              },
            ],
          },
          {
            path: 'customer-service',
            children: [
              {
                path: 'h5',
                name: '/settings/customer-service/h5',
              },
              {
                path: 'wechat',
                name: '/settings/customer-service/wechat',
              },
            ],
          },
          {
            path: 'notification',
            children: [
              {
                path: 'settings',
                name: '/settings/notification/settings',
              },
            ],
          },
          {
            path: 'order',
            children: [
              {
                path: 'remind',
                name: '/settings/order/remind',
              },
              {
                path: 'settings',
                name: '/settings/order/settings',
              },
            ],
          },
          {
            path: 'others',
            children: [
              {
                path: 'defaults',
                name: '/settings/others/defaults',
              },
              {
                path: 'map',
                name: '/settings/others/map',
              },
              {
                path: 'upload',
                name: '/settings/others/upload',
              },
              {
                path: 'verify-code',
                name: '/settings/others/verify-code',
              },
            ],
          },
          {
            path: 'payment',
            children: [
              {
                path: 'alipay',
                name: '/settings/payment/alipay',
              },
              {
                path: 'wechat',
                name: '/settings/payment/wechat',
              },
            ],
          },
          {
            path: 'register',
            children: [
              {
                path: 'license',
                name: '/settings/register/license',
              },
              {
                path: 'privacy',
                name: '/settings/register/privacy',
              },
              {
                path: 'settings',
                name: '/settings/register/settings',
              },
            ],
          },
          {
            path: 'shipment',
            children: [
              {
                path: 'express',
                children: [
                  {
                    path: '',
                    name: '/settings/shipment/express/',
                  },
                  {
                    path: 'freight',
                    name: '/settings/shipment/express/freight',
                  },
                ],
              },
            ],
          },
          {
            path: 'sms',
            children: [
              {
                path: 'logs',
                name: '/settings/sms/logs',
              },
              {
                path: 'settings',
                name: '/settings/sms/settings',
              },
            ],
          },
          {
            path: 'store',
            children: [
              {
                path: 'contact',
                name: '/settings/store/contact',
              },
              {
                path: 'info',
                name: '/settings/store/info',
              },
            ],
          },
        ],
      },
    ],
    meta: {
      isLayout: true,
    },
  },
  {
    path: '/system',
    children: [
      {
        path: '',
        children: [
          {
            path: 'extension',
            name: '/system/extension',
          },
          {
            path: 'info',
            name: '/system/info',
          },
        ],
      },
    ],
    meta: {
      isLayout: true,
    },
  },
  {
    path: '/user',
    children: [
      {
        path: '',
        children: [
          {
            path: 'manage',
            children: [
              {
                path: '',
                name: '/user/manage/',
              },
            ],
          },
        ],
      },
    ],
    meta: {
      isLayout: true,
    },
  },
]

export const goodsRoutes = [
  {
    path: '/goods',
    children: [
      {
        path: '',
        children: [
          {
            path: 'manage',
            children: [
              {
                path: 'attributes',
                children: [
                  {
                    path: '',
                    name: '/goods/manage/attributes/',
                  },
                  {
                    path: 'template',
                    name: '/goods/manage/attributes/template',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    meta: {
      isLayout: true,
    },
  },
]

export const metas = [
  {
    id: 'app',
    space: '',
    module: '',
    name: '应用',
    desc: '应用管理',
    icon: 'ph:vibrate',
  },
  {
    id: 'app.assets',
    space: 'app',
    module: '',
    name: '素材',
    desc: '设计素材',
    icon: 'ph:images',
  },
  {
    id: 'app.editor',
    space: 'app',
    module: '',
    name: '设计',
    desc: '应用设计',
    icon: 'ph:devices',
  },
  {
    id: 'app.editor.pages',
    space: 'app',
    module: 'app.editor',
    name: '页面',
    desc: '',
    icon: 'ph:picture-in-picture',
  },
  {
    id: 'app.editor.pages.catalog',
    space: 'app',
    module: 'app.editor',
    name: '商品分类',
    desc: '',
    icon: '',
  },
  {
    id: 'app.editor.pages.detail',
    space: 'app',
    module: 'app.editor',
    name: '商品详情',
    desc: '',
    icon: '',
  },
  {
    id: 'app.editor.pages.home',
    space: 'app',
    module: 'app.editor',
    name: '店铺首页',
    desc: '',
    icon: '',
  },
  {
    id: 'app.editor.pages.list',
    space: 'app',
    module: 'app.editor',
    name: '商品列表',
    desc: '',
    icon: '',
  },
  {
    id: 'app.editor.pages.member',
    space: 'app',
    module: 'app.editor',
    name: '会员中心',
    desc: '',
    icon: '',
  },
  {
    id: 'app.editor.pages.tabbar',
    space: 'app',
    module: 'app.editor',
    name: '底部导航',
    desc: '',
    icon: '',
  },
  {
    id: 'app.editor.publish',
    space: 'app',
    module: 'app.editor',
    name: '发布设置',
    desc: '',
    icon: 'ph:rocket',
  },
  {
    id: 'app.editor.publish.h5',
    space: 'app',
    module: 'app.editor',
    name: 'H5 端',
    desc: '',
    icon: '',
  },
  {
    id: 'app.editor.publish.wechat',
    space: 'app',
    module: 'app.editor',
    name: '微信小程序',
    desc: '',
    icon: '',
  },
  {
    id: 'app.editor.tools',
    space: 'app',
    module: 'app.editor',
    name: '工具',
    desc: '',
    icon: 'ph:wrench',
  },
  {
    id: 'app.editor.tools.assets',
    space: 'app',
    module: 'app.editor',
    name: '素材管理',
    desc: '',
    icon: '',
  },
  {
    id: 'app.editor.tools.custom',
    space: 'app',
    module: 'app.editor',
    name: '微页面',
    desc: '',
    icon: '',
  },
  {
    id: 'app.editor.tools.templates',
    space: 'app',
    module: 'app.editor',
    name: '风格模板',
    desc: '',
    icon: '',
  },
  {
    id: 'built-in',
    space: '',
    module: '',
    name: '内建',
    desc: '',
    icon: '-',
  },
  {
    id: 'connect',
    space: '',
    module: '',
    name: '云链',
    desc: '云链管理',
    icon: 'ph:cloud',
  },
  {
    id: 'manage',
    space: '',
    module: '',
    name: '管理',
    desc: '系统管理',
    icon: 'ph:gear',
  },
  {
    id: 'manage.settings',
    space: 'manage',
    module: '',
    name: '设置',
    desc: '系统设置',
    icon: 'ph:sliders',
  },
  {
    id: 'manage.settings.areas',
    space: 'manage',
    module: 'manage.settings',
    name: '地区设置',
    desc: '',
    icon: 'ph:map-trifold',
  },
  {
    id: 'manage.settings.customer-service',
    space: 'manage',
    module: 'manage.settings',
    name: '客服设置',
    desc: '',
    icon: 'ph:headset',
  },
  {
    id: 'manage.settings.customer-service.h5',
    space: 'manage',
    module: 'manage.settings',
    name: 'H5 端',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.customer-service.wechat',
    space: 'manage',
    module: 'manage.settings',
    name: '微信小程序',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.notification',
    space: 'manage',
    module: 'manage.settings',
    name: '消息通知',
    desc: '',
    icon: 'ph:notification',
  },
  {
    id: 'manage.settings.notification.settings',
    space: 'manage',
    module: 'manage.settings',
    name: '消息设置',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.notification.templates',
    space: 'manage',
    module: 'manage.settings',
    name: '消息模板',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.order',
    space: 'manage',
    module: 'manage.settings',
    name: '交易设置',
    desc: '',
    icon: 'ph:shopping-cart',
  },
  {
    id: 'manage.settings.order.remind',
    space: 'manage',
    module: 'manage.settings',
    name: '提醒设置',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.order.settings',
    space: 'manage',
    module: 'manage.settings',
    name: '订单设置',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.others',
    space: 'manage',
    module: 'manage.settings',
    name: '其他设置',
    desc: '',
    icon: 'ph:dots-three-circle',
  },
  {
    id: 'manage.settings.others.defaults',
    space: 'manage',
    module: 'manage.settings',
    name: '默认图片',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.others.map',
    space: 'manage',
    module: 'manage.settings',
    name: '地图设置',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.others.upload',
    space: 'manage',
    module: 'manage.settings',
    name: '上传设置',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.others.verify-code',
    space: 'manage',
    module: 'manage.settings',
    name: '验证码设置',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.payment',
    space: 'manage',
    module: 'manage.settings',
    name: '支付设置',
    desc: '',
    icon: 'ph:paypal-logo',
  },
  {
    id: 'manage.settings.payment.alipay',
    space: 'manage',
    module: 'manage.settings',
    name: '支付宝支付',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.payment.wechat',
    space: 'manage',
    module: 'manage.settings',
    name: '微信支付',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.register',
    space: 'manage',
    module: 'manage.settings',
    name: '登录注册',
    desc: '',
    icon: 'ph:key',
  },
  {
    id: 'manage.settings.register.license',
    space: 'manage',
    module: 'manage.settings',
    name: '用户协议',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.register.privacy',
    space: 'manage',
    module: 'manage.settings',
    name: '隐私政策',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.register.settings',
    space: 'manage',
    module: 'manage.settings',
    name: '注册设置',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.shipment',
    space: 'manage',
    module: 'manage.settings',
    name: '配送设置',
    desc: '',
    icon: 'ph:truck',
  },
  {
    id: 'manage.settings.shipment.city-delivery',
    space: 'manage',
    module: 'manage.settings',
    name: '同城配送',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.shipment.city-delivery',
    space: 'manage',
    module: 'manage.settings',
    name: '配送员',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.shipment.city-delivery.settings',
    space: 'manage',
    module: 'manage.settings',
    name: '配送设置',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.shipment.express',
    space: 'manage',
    module: 'manage.settings',
    name: '物流配送',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.shipment.express',
    space: 'manage',
    module: 'manage.settings',
    name: '快递公司',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.shipment.express.freight',
    space: 'manage',
    module: 'manage.settings',
    name: '运费设置',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.shipment.in-store',
    space: 'manage',
    module: 'manage.settings',
    name: '到店自提',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.sms',
    space: 'manage',
    module: 'manage.settings',
    name: '短信中心',
    desc: '',
    icon: 'ph:chat-circle-dots',
  },
  {
    id: 'manage.settings.sms.logs',
    space: 'manage',
    module: 'manage.settings',
    name: '发送记录',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.sms.settings',
    space: 'manage',
    module: 'manage.settings',
    name: '短信配置',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.store',
    space: 'manage',
    module: 'manage.settings',
    name: '店铺设置',
    desc: '',
    icon: 'ph:storefront',
  },
  {
    id: 'manage.settings.store.contact',
    space: 'manage',
    module: 'manage.settings',
    name: '联系方式',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.settings.store.info',
    space: 'manage',
    module: 'manage.settings',
    name: '基本信息',
    desc: '',
    icon: '',
  },
  {
    id: 'manage.system',
    space: 'manage',
    module: '',
    name: '系统',
    desc: '系统信息',
    icon: 'ph:info',
  },
  {
    id: 'manage.system.extension',
    space: 'manage',
    module: 'manage.system',
    name: '扩展信息',
    desc: '',
    icon: 'ph:puzzle-piece',
  },
  {
    id: 'manage.system.info',
    space: 'manage',
    module: 'manage.system',
    name: '系统信息',
    desc: '',
    icon: 'ph:diamonds-four',
  },
  {
    id: 'manage.system.logs',
    space: 'manage',
    module: 'manage.system',
    name: '系统日志',
    desc: '',
    icon: 'ph:note',
  },
  {
    id: 'manage.system.server',
    space: 'manage',
    module: 'manage.system',
    name: '服务器信息',
    desc: '',
    icon: 'ph:hard-drives',
  },
  {
    id: 'manage.user',
    space: 'manage',
    module: '',
    name: '员工',
    desc: '员工管理',
    icon: 'ph:user-square',
  },
  {
    id: 'manage.user.logs',
    space: 'manage',
    module: 'manage.user',
    name: '操作日志',
    desc: '',
    icon: 'ph:note',
  },
  {
    id: 'manage.user.manage',
    space: 'manage',
    module: 'manage.user',
    name: '员工管理',
    desc: '',
    icon: 'ph:users',
  },
  {
    id: 'manage.user.role',
    space: 'manage',
    module: 'manage.user',
    name: '角色管理',
    desc: '',
    icon: 'ph:folder-simple-user',
  },
  {
    id: 'shop',
    space: '',
    module: '',
    name: '店铺',
    desc: '店铺管理',
    icon: 'ph:storefront',
  },
  {
    id: 'shop.goods',
    space: 'shop',
    module: '',
    name: '商品',
    desc: '商品管理',
    icon: 'ph:package',
  },
  {
    id: 'shop.goods.manage',
    space: 'shop',
    module: 'shop.goods',
    name: '商品管理',
    desc: '',
    icon: 'ph:package',
  },
  {
    id: 'shop.goods.manage.attributes',
    space: 'shop',
    module: 'shop.goods',
    name: '商品参数',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.attributes',
    space: 'shop',
    module: 'shop.goods',
    name: '模板列表',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.attributes.template',
    space: 'shop',
    module: 'shop.goods',
    name: '模板设置',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.brand',
    space: 'shop',
    module: 'shop.goods',
    name: '商品品牌',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.brand.create',
    space: 'shop',
    module: 'shop.goods',
    name: ' 创建品牌',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.brand.delete',
    space: 'shop',
    module: 'shop.goods',
    name: ' 删除品牌',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.brand.edit',
    space: 'shop',
    module: 'shop.goods',
    name: ' 编辑品牌',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.category',
    space: 'shop',
    module: 'shop.goods',
    name: '商品分类',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.category.create',
    space: 'shop',
    module: 'shop.goods',
    name: ' 创建分类',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.category.delete',
    space: 'shop',
    module: 'shop.goods',
    name: ' 删除分类',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.category.edit',
    space: 'shop',
    module: 'shop.goods',
    name: ' 编辑分类',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.list',
    space: 'shop',
    module: 'shop.goods',
    name: '商品列表',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.list',
    space: 'shop',
    module: 'shop.goods',
    name: '商品列表',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.list.comments',
    space: 'shop',
    module: 'shop.goods',
    name: '评价',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.list.create',
    space: 'shop',
    module: 'shop.goods',
    name: '发布商品',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.list.delete',
    space: 'shop',
    module: 'shop.goods',
    name: '删除商品',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.list.edit',
    space: 'shop',
    module: 'shop.goods',
    name: '编辑商品',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.list.export',
    space: 'shop',
    module: 'shop.goods',
    name: '导出商品',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.list.history',
    space: 'shop',
    module: 'shop.goods',
    name: '浏览记录',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.list.in-stock',
    space: 'shop',
    module: 'shop.goods',
    name: '上架商品',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.list.sold-out',
    space: 'shop',
    module: 'shop.goods',
    name: '下架商品',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.recycle',
    space: 'shop',
    module: 'shop.goods',
    name: '回收站',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.recycle.clean',
    space: 'shop',
    module: 'shop.goods',
    name: '清空回收站',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.tags',
    space: 'shop',
    module: 'shop.goods',
    name: '商品标签',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.tags.create',
    space: 'shop',
    module: 'shop.goods',
    name: ' 创建标签',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.tags.delete',
    space: 'shop',
    module: 'shop.goods',
    name: ' 删除标签',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.manage.tags.edit',
    space: 'shop',
    module: 'shop.goods',
    name: ' 编辑标签',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.settings',
    space: 'shop',
    module: 'shop.goods',
    name: '商品设置',
    desc: '',
    icon: 'ph:gear-six',
  },
  {
    id: 'shop.goods.settings.options',
    space: 'shop',
    module: 'shop.goods',
    name: '商品设置',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.settings.services',
    space: 'shop',
    module: 'shop.goods',
    name: '服务保障',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.stock',
    space: 'shop',
    module: 'shop.goods',
    name: '库存管理',
    desc: '',
    icon: 'ph:warehouse',
  },
  {
    id: 'shop.goods.stock.list',
    space: 'shop',
    module: 'shop.goods',
    name: '库存管理',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.stock.stock-check',
    space: 'shop',
    module: 'shop.goods',
    name: '库存盘点',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.stock.stock-in',
    space: 'shop',
    module: 'shop.goods',
    name: '入库管理',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.stock.stock-out',
    space: 'shop',
    module: 'shop.goods',
    name: '出库管理',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.stock.stock-swap',
    space: 'shop',
    module: 'shop.goods',
    name: '库存调拨',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.tools',
    space: 'shop',
    module: 'shop.goods',
    name: '商品工具',
    desc: '',
    icon: 'ph:wrench',
  },
  {
    id: 'shop.goods.tools.clawer',
    space: 'shop',
    module: 'shop.goods',
    name: '商品采集',
    desc: '',
    icon: '',
  },
  {
    id: 'shop.goods.tools.import',
    space: 'shop',
    module: 'shop.goods',
    name: '导入商品',
    desc: '',
    icon: '',
  },
]
