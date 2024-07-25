import type { ISettings } from '@/settings/types/settings'

export default defineMocks({
  /**
   * 获取地区列表
   */
  '/api/settings': ({ method, query }) => {
    const settings = [
      // 店铺设置 - 基本信息
      { key: 'store.name', value: 'XiaoShop' },
      { key: 'store.logo', value: '1' },
      { key: 'store.tel', value: '400-8163233' },
      { key: 'store.enableWeapp', value: '1' },
      { key: 'store.enableH5', value: '1' },

      // 店铺设置 - 联系信息
      { key: 'store.contact', value: '云链小朔' },
      { key: 'store.contactMobile', value: '18800000001' },
      { key: 'store.contactPhone', value: '0750-88640123' },
      { key: 'store.email', value: 'xiaos@mouji.net' },
      { key: 'store.area', value: '19,244,2314' },
      { key: 'store.address', value: '竹子林 32 号' },
      { key: 'store.longitude', value: '39.984120' },
      { key: 'store.latitude', value: '116.307484' },

      // 素材管理 - 图片处理
      { key: 'assets.image.enableImageCompress', value: '1' },
      { key: 'assets.image.imageCompressQuality', value: '90' },

      { key: 'assets.image.enableThumbnail', value: '1' },
      { key: 'assets.image.largeThumbnailWidth', value: '800' },
      { key: 'assets.image.largeThumbnailHeight', value: '800' },
      { key: 'assets.image.mediumThumbnailWidth', value: '400' },
      { key: 'assets.image.mediumThumbnailHeight', value: '400' },
      { key: 'assets.image.smallThumbnailWidth', value: '100' },
      { key: 'assets.image.smallThumbnailHeight', value: '100' },

      { key: 'assets.image.enableWatermark', value: '1' },
      { key: 'assets.image.watermarkType', value: 'image' },
      { key: 'assets.image.watermarkText', value: '' },
      { key: 'assets.image.watermarkTextSize', value: '' },
      { key: 'assets.image.watermarkTextColor', value: '#000000' },
      { key: 'assets.image.watermarkTextPosition', value: 'center' },
      { key: 'assets.image.watermarkTextX', value: '10' },
      { key: 'assets.image.watermarkTextY', value: '10' },
      { key: 'assets.image.watermarkImage', value: '5' },
      { key: 'assets.image.watermarkImagePosition', value: 'center' },
      { key: 'assets.image.watermarkImageOpacity', value: '100' },
      { key: 'assets.image.watermarkImageZoom', value: '20' },
      { key: 'assets.image.watermarkImageX', value: '10' },
      { key: 'assets.image.watermarkImageY', value: '10' },

      // 素材管理 - 云空间
      { key: 'assets.cloud.enableAliyun', value: '1' },

      // 素材管理 - 阿里云 OSS
      { key: 'assets.cloud.aliyun.accessKeyID', value: '' },
      { key: 'assets.cloud.aliyun.accessKeySecret', value: '' },
      { key: 'assets.cloud.aliyun.bucket', value: '' },
      { key: 'assets.cloud.aliyun.endpoint', value: '' },
      { key: 'assets.cloud.aliyun.enableCustomDomain', value: '1' },
      { key: 'assets.cloud.aliyun.customDomain', value: '' },

      // 商品管理 - 显示设置
      { key: 'goods.preference.enableGoodsStock', value: '1' },
      { key: 'goods.preference.enableGoodsSales', value: '1' },
      { key: 'goods.preference.enableGoodsOriginalPrice', value: '1' },
      { key: 'goods.preference.defaultGoodsImage', value: '' },

      // 商品管理 - 采集设置
      { key: 'goods.clawer.apiKey', value: '' },

      // 会员管理 - 登录注册
      { key: 'member.register.enableUsernameLogin', value: '1' },
      { key: 'member.register.enableMobileLogin', value: '1' },
      { key: 'member.register.enable3rdLogin', value: '1' },
      { key: 'member.register.enableBindingMobile', value: '1' },
      { key: 'member.register.passwordLength', value: '6' },
      { key: 'member.register.passwordStrong', value: '["number","lower"]' },
      { key: 'member.register.defaultAvatar', value: '' },

      // 会员管理 - 充值设置
      { key: 'member.prepaid.enablePrepaid', value: '1' },

      // 会员管理 - 注销设置
      { key: 'member.cancel.enableCancel', value: '1' },
      { key: 'member.cancel.enableCancelAudit', value: '1' },

      // 订单设置 - 订单设置
      { key: 'order.deal.autoCloseOrderExpire', value: '3' },
      { key: 'order.deal.autoDeliverOrderExpire', value: '7' },
      { key: 'order.deal.autoCompleteOrderExpire', value: '7' },
      { key: 'order.deal.allowRefundExpire', value: '7' },
      { key: 'order.deal.refundMethod', value: 'direct' },
      { key: 'order.deal.enableComment', value: '1' },
      { key: 'order.deal.enableDisplayComment', value: '1' },
      { key: 'order.deal.enableCommentAudit', value: '1' },
      { key: 'order.deal.taxRate', value: '3.5' },
      { key: 'order.deal.invoiceFee', value: '10' },
      { key: 'order.deal.invoiceCategories', value: '["办公用品"]' },
      { key: 'order.deal.invoiceType', value: '["paper"]' },
      { key: 'order.deal.verificationCodeExpires', value: '1' },

      // 订单设置 - 支付设置
      { key: 'order.payment.enableWepay', value: '1' },
      { key: 'order.payment.enableAlipay', value: '1' },
      { key: 'order.payment.enableBalance', value: '0' },

      // 订单设置 - 支付设置 - 微信支付
      { key: 'order.payment.wepay.enableRefund', value: '1' },
      { key: 'order.payment.wepay.enableTransfer', value: '1' },
      { key: 'order.payment.wepay.appId', value: '' },
      { key: 'order.payment.wepay.apiVer', value: 'v2' },
      { key: 'order.payment.wepay.apiV2Key', value: '' },
      { key: 'order.payment.wepay.apiV3Key', value: '' },
      { key: 'order.payment.wepay.enableCert', value: '' },
      { key: 'order.payment.wepay.apiClientCert', value: '' },
      { key: 'order.payment.wepay.apiClientKey', value: '' },

      // 订单设置 - 支付设置 - 支付宝
      { key: 'order.payment.alipay.enableRefund', value: '1' },
      { key: 'order.payment.alipay.enableTransfer', value: '1' },
      { key: 'order.payment.alipay.apiMode', value: 'key' },
      { key: 'order.payment.alipay.appId', value: '' },
      { key: 'order.payment.alipay.appPrivateKey', value: '' },
      { key: 'order.payment.alipay.appPublicKey', value: '' },
      { key: 'order.payment.alipay.publicKey', value: '' },
      { key: 'order.payment.alipay.appCertPublicKeyFile', value: '' },
      { key: 'order.payment.alipay.certPublicKeyFile', value: '' },
      { key: 'order.payment.alipay.rootCertFile', value: '' },

      // 订单管理 - 发货设置
      { key: 'order.shipment.enableExpress', value: '1' },
      { key: 'order.shipment.enableLocal', value: '0' },
      { key: 'order.shipment.enableSelf', value: '0' },

      // 订单管理 - 快递100设置
      { key: 'order.kd100.appKey', value: '' },
      { key: 'order.kd100.customer', value: '' },

      // 订单管理 - 自提设置
      { key: 'order.self.pickupDays', value: '[1, 2, 3, 4, 5, 6, 7]' },
      { key: 'order.self.pickupTimeFrames', value: '[["9:00", "23:00"]]' },
      { key: 'order.self.pickupTimeStep', value: '30' },

      // 财务管理 - 提醒设置
      { key: 'finance.payouts.enablePayouts', value: '1' },
      { key: 'finance.payouts.enablePayoutsAudit', value: '1' },
      { key: 'finance.payouts.enableAutoTransfer', value: '1' },
      { key: 'finance.payouts.transferChargeRate', value: '10' },
      { key: 'finance.payouts.minPayoutsAmount', value: '100' },
      { key: 'finance.payouts.maxPayoutsAmount', value: '1000' },
      { key: 'finance.payouts.payoutsType', value: '["alipay"]' },

      // 短信中心
      { key: 'sms.enableAliyun', value: '1' },

      // 短信中心 - 阿里云短信
      { key: 'sms.aliyun.appKey', value: '' },
      { key: 'sms.aliyun.secretKey', value: '' },
      { key: 'sms.aliyun.sign', value: '' },

      // 客服设置 - 微信小程序
      { key: 'cs.weapp.type', value: 'wxwork' },
      { key: 'cs.weapp.wxWorkUrl', value: '' },
      { key: 'cs.weapp.wxWorkCropId', value: '' },

      // 客服设置 - H5
      { key: 'cs.h5.type', value: 'wxwork' },
      { key: 'cs.h5.wxWorkUrl', value: '' },
      { key: 'cs.h5.thirdPartyUrl', value: '' },

      // 其它 - 地图设置
      { key: 'map.key', value: '' },
      { key: 'map.enableMobileLocation', value: '1' },
      { key: 'map.mobileLocationExpire', value: '15' },

      // 其它 - 验证码设置
      { key: 'verifyCode.enableOnAdminLogin', value: '1' },
      { key: 'verifyCode.enableOnLogin', value: '1' },
      { key: 'verifyCode.enableOnRegister', value: '1' },

      // 其它 - 上传文件
      { key: 'upload.maxFileSize', value: '8000' },
    ]

    if (method === 'PUT')
      return responseMock()

    const { key, group } = query
    const result = settings.map((s, i) => ({ ...s, id: i + 1 })) as ISettings[]

    if (key !== undefined)
      return responseMock<ISettings>(result.find(item => item.key === key))

    if (group !== undefined) {
      return responseMock<ISettings[]>(
        result.filter(item => item.key.startsWith(group)),
      )
    }

    return responseMock(result)
  },
})
