import type { IApiSettingsItem } from '../settings'

export default defineMocks({
  /**
   * 获取地区列表
   */
  '/api/settings': ({ method, query }) => {
    const settings = [

      // 店铺设置 - 基本信息
      { key: 'settings.store.name', value: 'XiaoShop' },
      { key: 'settings.store.logo', value: '/img/logo.png' },
      { key: 'settings.store.tel', value: '400-8163233' },
      { key: 'settings.store.enableWeapp', value: '1' },
      { key: 'settings.store.enableH5', value: '1' },

      // 店铺设置 - 联系信息
      { key: 'settings.store.contact', value: '云链小朔' },
      { key: 'settings.store.contactMobile', value: '18800000001' },
      { key: 'settings.store.contactPhone', value: '0750-88640123' },
      { key: 'settings.store.email', value: 'xiaos@mouji.net' },
      { key: 'settings.store.area', value: '1,2,3' },
      { key: 'settings.store.address', value: '竹子林 32 号' },
      { key: 'settings.store.longitude', value: '39.984120' },
      { key: 'settings.store.latitude', value: '116.307484' },

      // 商品管理 - 显示设置
      { key: 'shop.goods.enableGoodsStock', value: '1' },
      { key: 'shop.goods.enableGoodsSales', value: '1' },
      { key: 'shop.goods.enableGoodsOriginalPrice', value: '1' },
      { key: 'shop.goods.defaultGoodsImage', value: '' },

      // 商品管理 - 采集设置
      { key: 'shop.goods.clawerApiKey', value: '' },

      // 素材管理 - 图片处理
      { key: 'app.assets.enableImageCompress', value: '1' },
      { key: 'app.assets.imageCompressQuality', value: '90' },
      { key: 'app.assets.enableThumbnail', value: '1' },
      { key: 'app.assets.largeThumbnailWidth', value: '800' },
      { key: 'app.assets.largeThumbnailHeight', value: '800' },
      { key: 'app.assets.mediumThumbnailWidth', value: '400' },
      { key: 'app.assets.mediumThumbnailHeight', value: '400' },
      { key: 'app.assets.smallThumbnailWidth', value: '100' },
      { key: 'app.assets.smallThumbnailHeight', value: '100' },
      { key: 'app.assets.enableWatermark', value: '1' },
      { key: 'app.assets.watermarkType', value: 'image' },
      { key: 'app.assets.watermarkText', value: '' },
      { key: 'app.assets.watermarkTextSize', value: '' },
      { key: 'app.assets.watermarkTextColor', value: '#000000' },
      { key: 'app.assets.watermarkTextPosition', value: 'center' },
      { key: 'app.assets.watermarkTextX', value: '10' },
      { key: 'app.assets.watermarkTextY', value: '10' },
      { key: 'app.assets.watermarkImage', value: '5' },
      { key: 'app.assets.watermarkImagePosition', value: 'center' },
      { key: 'app.assets.watermarkImageOpacity', value: '100' },
      { key: 'app.assets.watermarkImageZoom', value: '20' },
      { key: 'app.assets.watermarkImageX', value: '10' },
      { key: 'app.assets.watermarkImageY', value: '10' },

      // 素材管理 - 阿里云 OSS
      { key: 'app.assets.enableAliyunOSS', value: '1' },
      { key: 'app.assets.aliyunOSSAccessKeyID', value: '' },
      { key: 'app.assets.aliyunOSSAccessKeySecret', value: '' },
      { key: 'app.assets.aliyunOSSBucket', value: '' },
      { key: 'app.assets.aliyunOSSEndpoint', value: '' },
      { key: 'app.assets.enableAliyunOSSCustomDomain', value: '1' },
      { key: 'app.assets.aliyunOSSCustomDomain', value: '' },

      // 登录注册
      { key: 'register.enableUsernameLogin', value: '1' },
      { key: 'register.enableMobileLogin', value: '1' },
      { key: 'register.enable3rdLogin', value: '1' },
      { key: 'register.enableBindingMobile', value: '1' },
      { key: 'register.passwordLength', value: '6' },
      { key: 'register.passwordStrong', value: '["number","lower"]' },

      // 消息通知
      { key: 'notification.verificationCodeExpires', value: '1' },

      // 短信中心
      { key: 'sms.enableAliyunSms', value: '1' },
      { key: 'sms.aliyunSmsAppKey', value: '' },
      { key: 'sms.aliyunSmsSecretKey', value: '' },
      { key: 'sms.aliyunSmsSign', value: '' },

      // 支付设置 - 微信支付
      { key: 'payment.enableWepay', value: '1' },
      { key: 'payment.enableWepayRefund', value: '1' },
      { key: 'payment.enableWepayTransfer', value: '1' },
      { key: 'payment.wepayAppId', value: '' },
      { key: 'payment.wepayApiVer', value: 'v2' },
      { key: 'payment.wepayApiV2Key', value: '' },
      { key: 'payment.wepayApiV3Key', value: '' },
      { key: 'payment.enableWepayCert', value: '' },
      { key: 'payment.wepayApiClientCert', value: '' },
      { key: 'payment.wepayApiClientKey', value: '' },

      // 支付设置 - 支付宝
      { key: 'payment.enableAlipay', value: '1' },
      { key: 'payment.enableAlipayRefund', value: '1' },
      { key: 'payment.enableAlipayTransfer', value: '1' },
      { key: 'payment.alipayApiMode', value: 'key' },
      { key: 'payment.alipayAppId', value: '' },
      { key: 'payment.alipayAppPrivateKey', value: '' },
      { key: 'payment.alipayAppPublicKey', value: '' },
      { key: 'payment.alipayPublicKey', value: '' },
      { key: 'payment.alipayAppCertPublicKeyFile', value: '' },
      { key: 'payment.alipayCertPublicKeyFile', value: '' },
      { key: 'payment.alipayRootCertFile', value: '' },

      // 订单设置 - 订单设置
      { key: 'order.enableBalance', value: '0' },
      { key: 'order.autoCloseOrderExpire', value: '3' },
      { key: 'order.autoDeliverOrderExpire', value: '7' },
      { key: 'order.autoCompleteOrderExpire', value: '7' },
      { key: 'order.allowRefundExpire', value: '7' },
      { key: 'order.refundMethod', value: 'direct' },
      { key: 'order.enableComment', value: '1' },
      { key: 'order.enableDisplayComment', value: '1' },
      { key: 'order.enableCommentAudit', value: '1' },
      { key: 'order.taxRate', value: '3.5' },
      { key: 'order.invoiceFee', value: '10' },
      { key: 'order.invoiceCategories', value: '["办公用品"]' },
      { key: 'order.invoiceType', value: '["paper"]' },

      // 订单设置 - 提醒设置
      { key: 'order.enablePayouts', value: '1' },
      { key: 'order.enablePayoutsAudit', value: '1' },
      { key: 'order.enableAutoTransfer', value: '1' },
      { key: 'order.transferChargeRate', value: '10' },
      { key: 'order.minPayoutsAmount', value: '100' },
      { key: 'order.maxPayoutsAmount', value: '1000' },
      { key: 'order.payoutsType', value: '["alipay"]' },

      // 客服设置 - 微信小程序
      { key: 'cs.weappType', value: 'wxwork' },
      { key: 'cs.weappWxWorkUrl', value: '' },
      { key: 'cs.weappWxWorkCropId', value: '' },

      // 客服设置 - H5
      { key: 'cs.h5Type', value: 'wxwork' },
      { key: 'cs.h5WxWorkUrl', value: '' },
      { key: 'cs.h53rdUrl', value: '' },

      { key: 'settings.defaults.defaultUserAvatar', value: '' },

      // 其它 - 地图设置
      { key: 'qqMapKey', value: '' },
      { key: 'enableMobileLocation', value: '1' },
      { key: 'mobileLocationExpire', value: '15' },

      // 其它 - 验证码设置
      { key: 'enableAdminLoginVerifyCode', value: '1' },
      { key: 'enableLoginVerifyCode', value: '1' },
      { key: 'enableRegisterVerifyCode', value: '1' },

      // 其它 - 上传文件
      { key: 'uploadFileSize', value: '8000' },
    ]

    if (method === 'PUT')
      return responseMock()

    const { key, group } = query
    const result = settings.map((s, i) => ({ ...s, id: i + 1 })) as IApiSettingsItem[]

    if (key !== undefined)
      return responseMock<IApiSettingsItem>(result.find(item => item.key === key))

    if (group !== undefined) {
      return responseMock<IApiSettingsItem[]>(
        result.filter(item => item.key.startsWith(group)),
      )
    }

    return responseMock(result)
  },
})
