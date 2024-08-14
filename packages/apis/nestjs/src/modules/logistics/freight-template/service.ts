import { Enabled, type ILogisticsFreightTemplate, ILogisticsFreightTemplateDict, ILogisticsFreightTemplateListItem } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BadRequestException, ExistsException, FailedException, NotFoundException } from '~/common/exception'
import { FreightTemplatePayload } from '@/logistics/freight-template/dto'
import { LogisticsFreightTemplate } from '@/logistics/freight-template/entity'
import { StaffLogService } from '@/staff/log/service'

@Injectable()
export class LogisticsFreightTemplateService {
  constructor(
    @InjectRepository(LogisticsFreightTemplate)
    private readonly repository: Repository<LogisticsFreightTemplate>,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {}

  /**
   * 获取运费模板列表
   *
   * @throws FailedException
   * @returns Promise<ILogisticsFreightTemplateListItem[]>
   * @see {@link ILogisticsFreightTemplateListItem}
   */
  async findList(): Promise<ILogisticsFreightTemplateListItem[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name', 'calcMode', 'enableFreeRules', 'updatedTime'],
        order: {
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取运费模板列表', e.message)
    }
  }

  /**
   * 获取运费模板字典列表
   *
   * @throws FailedException
   * @returns Promise<ILogisticsFreightTemplateDict[]>
   * @see {@link ILogisticsFreightTemplateDict}
   */
  async findDictList(): Promise<ILogisticsFreightTemplateDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        order: {
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取运费模板字典列表', e.message)
    }
  }

  /**
   * 获取运费模板详情
   *
   * @param id number
   * @throws FailedException
   * @throws NotFoundException
   * @returns Promise<ILogisticsFreightTemplate>
   * @see {@link ILogisticsFreightTemplate}
   */
  async findDetail(id: number): Promise<ILogisticsFreightTemplate> {
    try {
      const detail = await this.repository.findOne({
        where: {
          id,
        },
      })

      if (!detail)
        throw new NotFoundException('运费模板')

      return detail
    }
    catch (e) {
      throw new FailedException('获取运费模板详情', e.message, e.status)
    }
  }

  /**
   * 创建运费模板
   *
   * @param data FreightTemplatePayload
   * @throws FailedException
   * @throws ExistsException
   * @throws BadRequestException
   * @returns Promise<void>
   */
  async create(data: FreightTemplatePayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`运费模板 [${data.name}] `)

      if (data.rules.length === 0)
        throw new BadRequestException('运费地区 [rules] 不能为空')

      if (data.enableFreeRules === Enabled.YES && data.freeRules.length === 0)
        throw new BadRequestException('包邮地区 [freeRules] 不能为空')

      const template = new LogisticsFreightTemplate()

      template.name = data.name
      template.calcMode = data.calcMode
      template.rules = data.rules
      template.enableFreeRules = data.enableFreeRules
      template.freeRules = data.freeRules

      await this.repository.save(template)
      await this.log.write('物流发货', `创建运费模板「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('创建运费模板', e.message, e.status)
    }
  }

  /**
   * 更新运费模板
   *
   * @param id number
   * @param data FreightTemplatePayload
   * @throws FailedException
   * @throws ExistsException
   * @throws BadRequestException
   * @returns Promise<void>
   */
  async update(id: number, data: FreightTemplatePayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`运费模板 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`运费模板 [${data.name}] `)

      if (data.rules.length === 0)
        throw new BadRequestException('运费地区不能为空')

      if (data.enableFreeRules === Enabled.YES && data.freeRules.length === 0)
        throw new BadRequestException('包邮地区不能为空')

      const template = new LogisticsFreightTemplate()

      template.id = id
      template.name = data.name
      template.calcMode = data.calcMode
      template.rules = data.rules
      template.enableFreeRules = data.enableFreeRules
      template.freeRules = data.freeRules

      await this.repository.save(template)
      await this.log.write('物流发货', `更新运费模板「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('更新运费模板', e.message, e.status)
    }
  }

  /**
   * 删除运费模板
   *
   * @param id number
   * @throws FailedException
   * @returns Promise<void>
   */
  async delete(id: number) {
    try {
      const template = await this.repository.findOneBy({ id })

      if (template) {
        await this.repository.delete({ id })
        await this.log.write('物流发货', `删除运费模板「${template.name}」`)
      }
    }
    catch (e) {
      throw new FailedException('删除运费模板', e.message, e.status)
    }
  }
}
