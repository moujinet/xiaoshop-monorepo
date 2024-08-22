import type { IYesOrNo } from '@xiaoshop/shared'

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
   *
   * @see {@link IYesOrNo}
   */
  enableCompress: IYesOrNo
  /**
   * 是否开启缩略图
   *
   * @see {@link IYesOrNo}
   */
  enableThumbnail: IYesOrNo
  /**
   * 是否开启水印
   *
   * @see {@link IYesOrNo}
   */
  enableWatermark: IYesOrNo
}
