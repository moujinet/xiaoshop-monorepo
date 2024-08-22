import {
  type ILogisticsTemplate,
  type ILogisticsTemplateDict,
  type ILogisticsTemplateListItem,
  YesOrNo,
} from '@xiaoshop/shared'
import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { LogisticsTemplatePayload } from '@/logistics/template/dto'
import { LogisticsFreightTemplate } from '@/logistics/template/entity'
import {
  LogisticsTemplateCreatedEvent,
  LogisticsTemplateDeletedEvent,
  LogisticsTemplateUpdatedEvent,
} from '@/logistics/template/events'
import {
  BadRequestException,
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class LogisticsTemplateService {
  constructor(
    @InjectRepository(LogisticsFreightTemplate)
    private readonly repository: Repository<LogisticsFreightTemplate>,

    @Inject(EventEmitter2)
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * 获取运费模板列表
   *
   * @throws {FailedException} 获取运费模板列表失败
   * @returns Promise<ILogisticsTemplateListItem[]>
   * @see {@link ILogisticsTemplateListItem}
   */
  async findList(): Promise<ILogisticsTemplateListItem[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name', 'desc', 'sort', 'calcMode', 'enableFreeRules', 'updatedTime'],
        order: {
          sort: 'ASC',
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
   * @throws {FailedException} 获取运费模板字典列表失败
   * @returns Promise<ILogisticsTemplateDict[]>
   * @see {@link ILogisticsTemplateDict}
   */
  async findDictList(): Promise<ILogisticsTemplateDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        order: {
          sort: 'ASC',
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
   * @param id 运费模板 ID
   * @throws {FailedException} 获取运费模板详情失败
   * @throws {NotFoundException} 运费模板不存在
   * @returns Promise<ILogisticsTemplate>
   * @see {@link ILogisticsTemplate}
   */
  async findById(id: number): Promise<ILogisticsTemplate> {
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
   * @param data 运费模板
   * @throws {FailedException} 创建运费模板失败
   * @throws {ExistsException} 运费模板已存在
   * @throws {BadRequestException} 运费地区不能为空
   * @throws {BadRequestException} 包邮地区不能为空
   */
  async create(data: LogisticsTemplatePayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`运费模板 [${data.name}] `)

      if (data.rules.length === 0)
        throw new BadRequestException('运费地区不能为空')

      if (data.enableFreeRules === YesOrNo.YES && data.freeRules.length === 0)
        throw new BadRequestException('包邮地区不能为空')

      const template = new LogisticsFreightTemplate()

      template.name = data.name
      template.calcMode = data.calcMode
      template.rules = data.rules
      template.enableFreeRules = data.enableFreeRules
      template.freeRules = data.freeRules

      const created = await this.repository.save(template)

      this.eventEmitter.emit(
        toEventName(LogisticsTemplateCreatedEvent.name),
        new LogisticsTemplateCreatedEvent(created.id, created.name),
      )
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
  async update(id: number, data: LogisticsTemplatePayload) {
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

      if (data.enableFreeRules === YesOrNo.YES && data.freeRules.length === 0)
        throw new BadRequestException('包邮地区不能为空')

      const template = new LogisticsFreightTemplate()

      template.id = id
      template.name = data.name
      template.calcMode = data.calcMode
      template.rules = data.rules
      template.enableFreeRules = data.enableFreeRules
      template.freeRules = data.freeRules

      await this.repository.save(template)

      this.eventEmitter.emit(
        toEventName(LogisticsTemplateUpdatedEvent.name),
        new LogisticsTemplateUpdatedEvent(id, data.name),
      )
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

        this.eventEmitter.emit(
          toEventName(LogisticsTemplateDeletedEvent.name),
          new LogisticsTemplateDeletedEvent(id, template.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除运费模板', e.message, e.status)
    }
  }
}
