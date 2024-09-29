export default {
  // 本地存储(自定义域名)
  'customDomain': '',

  // 上传限制 (KB)
  'upload.maxFileSizeImage': '2500',
  'upload.maxFileSizeVideo': '10000',
  'upload.maxFileSizeFile': '20000',

  // 云存储 - 阿里云 OSS
  'storage.aliyun.enable': '0',
  'storage.aliyun.accessKeyID': '',
  'storage.aliyun.accessKeySecret': '',
  'storage.aliyun.bucket': '',
  'storage.aliyun.endpoint': '',
  'storage.aliyun.enableCustomDomain': '0',
  'storage.aliyun.customDomain': '',

  // 图片处理 - 图片压缩
  'image.enableCompress': '1',
  'image.compressQuality': '90',

  // 图片处理 - 缩略图
  'image.enableThumbnail': '1',
  'image.thumbnailLargeWidth': '800',
  'image.thumbnailLargeHeight': '800',
  'image.thumbnailMediumWidth': '400',
  'image.thumbnailMediumHeight': '400',
  'image.thumbnailSmallWidth': '100',
  'image.thumbnailSmallHeight': '100',

  // 图片处理 - 水印
  'image.enableWatermark': '1',
  'image.watermarkType': 'text',
  'image.watermarkOpacity': '60',

  // 图片处理 - 文字水印
  'image.watermarkTextValue': 'XiaoShop',
  'image.watermarkTextSize': '16',
  'image.watermarkTextColor': '#000000',
  'image.watermarkTextPosition': 'center',
  'image.watermarkTextX': '10',
  'image.watermarkTextY': '10',

  // 图片处理 - 图片水印
  'image.watermarkImageSrc': '',
  'image.watermarkImagePosition': 'center',
  'image.watermarkImageRatio': '20',
  'image.watermarkImageX': '10',
  'image.watermarkImageY': '10',
}
