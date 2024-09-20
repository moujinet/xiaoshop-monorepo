import type { YesOrNo } from '@xiaoshop/shared'

/**
 * 素材图片处理任务
 */
export interface IResourceImageProcessJob {
  /**
   * 图片路径
   */
  file: string
  /**
   * 图片 MIME 类型
   */
  mimeType: string
  /**
   * 是否开启压缩
   */
  isCompress: YesOrNo
  /**
   * 是否开启缩略图
   */
  isThumbnail: YesOrNo
  /**
   * 是否开启水印
   */
  isWatermark: YesOrNo
}
