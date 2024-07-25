import type { ISettingsDict } from '@xiaoshop/schema'

export const AssetsSettings: ISettingsDict = {
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
  'image.watermarkImageOpacity': '100',
  'image.watermarkImageZoom': '20',
  'image.watermarkImageX': '10',
  'image.watermarkImageY': '10',
}
