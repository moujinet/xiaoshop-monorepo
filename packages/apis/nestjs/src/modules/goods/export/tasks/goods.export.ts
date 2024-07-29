import { Job } from 'bull'
import { utils, writeFile } from 'xlsx'
import { ConfigService } from '@nestjs/config'
import { Inject, Logger } from '@nestjs/common'
import { Process, Processor } from '@nestjs/bull'
import { GOODS_SOURCES, GOODS_TYPES, GoodsExportRecordStatus } from '@xiaoshop/schema'
import { IGoodsExportJob } from '@/goods/interface'
import { GoodsService } from '@/goods/manage/service'
import { GoodsExportRecordService } from '@/goods/export/service'
import { GOODS_EXPORT_TASK, GOODS_QUEUE_ID } from '@/goods/constants'
import { ensureDir } from '~/utils/path'

@Processor(GOODS_QUEUE_ID)
export class GoodsExportTask {
  private readonly logger = new Logger(GoodsExportTask.name)

  constructor(
    @Inject(GoodsService)
    private readonly goods: GoodsService,

    @Inject(GoodsExportRecordService)
    private readonly exportRecord: GoodsExportRecordService,

    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {}

  @Process(GOODS_EXPORT_TASK)
  async handler(job: Job<IGoodsExportJob>) {
    const {
      id,
      conditions,
    } = job.data

    try {
      this.logger.debug(`导出任务: ${id}`)

      const result = await this.goods.findExportList(conditions)

      const rows = result.map((item) => {
        return {
          skuCode: item.skuCode,
          name: item.name,
          isMultiSkus: item.isMultiSkus === 'Y' ? '是' : '否',
          type: GOODS_TYPES.find(type => type.value === item.type)?.label || '未填写',
          source: GOODS_SOURCES.find(source => source.value === item.source)?.label || '未填写',
          categories: item.categories?.map(category => category.name).join(', '),
          brand: item.brand?.name || '未填写',
          group: item.group?.name || '未填写',
          tag: item.tag?.name || '未填写',
          price: item.price,
          originalPrice: item.originalPrice,
          costPrice: item.costPrice,
          inventory: item.inventory,
          sales: item.sales,
          weight: item.weight,
          volume: item.volume,
          unit: item.unit,
        }
      })

      this.logger.debug(`导出商品: ${JSON.stringify(rows)}`)

      if (rows.length > 0) {
        const filename = await this.exportXlsx(id, rows)

        this.exportRecord.updateStatusAndCount(
          id,
          GoodsExportRecordStatus.SUCCESS,
          result.length,
          filename,
        )
      }
      else {
        this.exportRecord.updateStatusAndCount(
          id,
          GoodsExportRecordStatus.FAILED,
          result.length,
          '没有符合条件的商品',
        )
      }
    }
    catch (e) {
      this.logger.error(e.message)

      this.exportRecord.updateStatusAndCount(
        id,
        GoodsExportRecordStatus.FAILED,
        0,
        e.message,
      )
    }
  }

  /**
   * 导出 XLSX
   *
   * @param id number
   * @param rows any[]
   * @returns Promise<string>
   */
  async exportXlsx(id: number, rows: any[]): Promise<string> {
    const workbook = utils.book_new()
    const worksheet = utils.json_to_sheet(rows)

    utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    utils.sheet_add_aoa(worksheet, [[
      '商品编码',
      '商品名称',
      '是否多规格',
      '商品类型',
      '商品来源',
      '分类',
      '品牌',
      '分组',
      '标签',
      '价格',
      '原价(划线价)',
      '成本价',
      '库存',
      '销量',
      '重量',
      '体积',
      '单位',
    ]], { origin: 'A1' })

    const uploadFolder = this.config.get<string>('upload.dest')
    const dest = ensureDir(uploadFolder, 'xlsx')
    const returnDest = `${dest.replace(`${uploadFolder.replace('./', '')}/`, '')}/${id}.xlsx`

    writeFile(
      workbook,
      `${dest}/${id}.xlsx`,
      {
        compression: true,
      },
    )

    this.logger.debug(`导出 XLSX 成功: ${returnDest}`)

    return returnDest
  }
}
