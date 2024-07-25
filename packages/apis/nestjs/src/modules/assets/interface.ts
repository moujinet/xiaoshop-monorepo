import type { IEnabled } from '@xiaoshop/schema'

/**
 * 素材图片处理任务
 */
export interface IAssetImageProcessJob {
  /**
   * 图片路径
   */
  file: string

  /**
   * 是否开启压缩
   */
  enableCompress: IEnabled

  /**
   * 是否开启缩略图
   */
  enableThumbnail: IEnabled

  /**
   * 是否开启水印
   */
  enableWatermark: IEnabled
}
