import {
  ColorName,
  type IDict,
  ProductExportStatus,
} from '@xiaoshop/shared'

/**
 * 导出状态 - 字典
 *
 * @see {@link ProductExportStatus}
 */
export const PRODUCT_EXPORT_STATUSES: IDict[] = [
  { value: '待导出', key: ProductExportStatus.PENDING, color: ColorName.ARCOBLUE },
  { value: '导出完成', key: ProductExportStatus.COMPLETED, color: ColorName.GREEN },
  { value: '导出失败', key: ProductExportStatus.FAILED, color: ColorName.RED },
]
