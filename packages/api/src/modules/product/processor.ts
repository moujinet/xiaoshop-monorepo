import {
  PRODUCT_SOURCES,
  PRODUCT_STATUSES,
  PRODUCT_TYPES,
  YesOrNo,
} from '@xiaoshop/shared'
import { Job } from 'bull'
import { utils, writeFile } from 'xlsx'
import { ConfigService } from '@nestjs/config'
import { Inject, Logger } from '@nestjs/common'
import { Process, Processor } from '@nestjs/bull'
import { ProductService } from '@/product/product/service'
import { ProductExportService } from '@/product/export/service'
import { IProductExportProcessContext } from '@/product/interface'
import { PRODUCT_EXPORT_PROCESS, PRODUCT_QUEUE_ID } from '@/product/constants'
import { ensureDir } from '@/upload/utils'

@Processor(PRODUCT_QUEUE_ID)
export class ProductProcessor {
  private readonly logger = new Logger(ProductProcessor.name)

  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,

    @Inject(ProductService)
    private readonly product: ProductService,

    @Inject(ProductExportService)
    private readonly productExport: ProductExportService,
  ) {}

  /**
   * 商品导出
   *
   * @param job 商品导出上下文
   */
  @Process(PRODUCT_EXPORT_PROCESS)
  async handleProductExport(job: Job<IProductExportProcessContext>) {
    try {
      const {
        id,
        conditions,
      } = job.data

      this.logger.debug(`开始导出商品 - ${JSON.stringify(conditions)}`)

      const result = await this.product.findExportList(conditions)

      if (result.length === 0) {
        await this.productExport.update(id, 0, '')
      }

      const rows: any[] = []

      for (const item of result) {
        rows.push({
          id: item.id,
          skuCode: item.skus[0].skuCode,
          name: item.name,
          isMultiSkus: item.isMultiSkus,
          type: PRODUCT_TYPES.find(t => t.value === item.type)?.label || '未填写',
          source: PRODUCT_SOURCES.find(s => s.value === item.source)?.label || '未填写',
          status: PRODUCT_STATUSES.find(s => s.value === item.status)?.label || '未填写',
          categories: item.categories.map(c => c.name).join(' / '),
          brand: item.brand?.name || '未填写',
          group: item.group?.name || '未填写',
          tag: item.tag?.name || '未填写',
          price: item.price,
          inventory: item.inventory,
          sales: item.sales,
          weight: item.skus[0].weight,
          volume: item.skus[0].volume,
          unit: item.skus[0].unit,
        })

        if (item.isMultiSkus === YesOrNo.YES) {
          for (const sku of item.skus) {
            rows.push({
              id: sku.id,
              skuCode: sku.skuCode,
              name: `├  ${sku.name} (${sku.attributes.map(v => `${v.name}: ${v.value}`).join(' / ')})`,
              isMultiSkus: item.isMultiSkus,
              type: PRODUCT_TYPES.find(t => t.value === item.type)?.label || '未填写',
              source: PRODUCT_SOURCES.find(s => s.value === item.source)?.label || '未填写',
              status: PRODUCT_STATUSES.find(s => s.value === item.status)?.label || '未填写',
              categories: item.categories.map(c => c.name).join(' / '),
              brand: item.brand?.name || '未填写',
              group: item.group?.name || '未填写',
              tag: item.tag?.name || '未填写',
              price: sku.price,
              inventory: sku.inventory,
              sales: sku.sales,
              weight: sku.weight,
              volume: sku.volume,
              unit: sku.unit,
            })
          }
        }
      }

      const filePath = await this.exportXlsx(id, rows)

      await this.productExport.update(id, rows.length, filePath)

      this.logger.debug(`导出商品完成 - ${rows.length} 条`)
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }

  /**
   * 导出 XLSX 文件
   *
   * @param id 导出记录 ID
   * @param rows 商品记录
   * @returns 导出文件路径
   */
  async exportXlsx(id: number, rows: any[]): Promise<string> {
    this.logger.debug('开始导出 XLSX')

    const workbook = utils.book_new()
    const worksheet = utils.json_to_sheet(rows)

    utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    utils.sheet_add_aoa(worksheet, [[
      '商品 ID',
      'SKU 编码',
      '名称',
      '多规格?',
      '类型',
      '来源',
      '状态',
      '分类',
      '品牌',
      '分组',
      '标签',
      '价格',
      '库存',
      '销量',
      '重量',
      '体积',
      '单位',
    ]], { origin: 'A1' })

    worksheet['!cols'] = [
      {},
      { wch: rows.reduce((w, r) => Math.max(w, r.skuCode.length), 10) },
      { wch: rows.reduce((w, r) => Math.max(w, r.name.length), 10) },
      {},
      { wch: rows.reduce((w, r) => Math.max(w, r.type.length), 10) },
      { wch: rows.reduce((w, r) => Math.max(w, r.source.length), 10) },
      { wch: rows.reduce((w, r) => Math.max(w, r.status.length), 10) },
      { wch: rows.reduce((w, r) => Math.max(w, r.categories.length), 10) },
      { wch: rows.reduce((w, r) => Math.max(w, r.brand.length), 10) },
      { wch: rows.reduce((w, r) => Math.max(w, r.group.length), 10) },
      { wch: rows.reduce((w, r) => Math.max(w, r.tag.length), 10) },
    ]

    for (let i = 0; i < rows.length; i++) {
      worksheet[`L${i + 2}`].z = '_("¥"* #,##0.00_);_("¥"* \\(#,##0.00\\);_("¥"* "-"??_);_(@_)'
    }

    const uploadFolder = this.config.get<string>('upload.dest')
    const dest = ensureDir(uploadFolder, 'xlsx')
    const returnDest = `${dest.replace(`${uploadFolder.replace('./', '')}/`, '')}/${id}.xlsx`

    writeFile(workbook, `${dest}/${id}.xlsx`, {
      compression: true,
    })

    this.logger.debug(`导出 XLSX 成功: ${returnDest}`)

    return returnDest
  }
}
