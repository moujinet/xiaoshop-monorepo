import type {
  IApiPaginationData,
  ILogisticFreightTemplateDict,
  ILogisticFreightTemplateInfo,
  ILogisticFreightTemplateList,
} from '@xiaoshop/shared'

import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { LOGISTIC_FREIGHT_CALC_MODES } from '~/common/dicts'
import { objectToDict, pipeDict, toDict, toEventName } from '~/utils/transformers'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'

import { LogisticFreightTemplate } from './entity'
import {
  FreightTemplatePayload,
  GetFreightTemplatePagesRequest,
} from './dto'
import {
  LogisticFreightTemplateCreateEvent,
  LogisticFreightTemplateDeleteEvent,
  LogisticFreightTemplateUpdateEvent,
} from './events'

@Injectable()
export class LogisticFreightTemplateService {
  constructor(
    @InjectRepository(LogisticFreightTemplate)
    private readonly repository: Repository<LogisticFreightTemplate>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取运费模板列表
   *
   * @param query 查询条件
   * @returns 运费模板列表
   * @throws {FailedException} 获取运费模板列表失败
   */
  async findPages(
    query: GetFreightTemplatePagesRequest,
  ): Promise<IApiPaginationData<ILogisticFreightTemplateList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [list, total] = await this.repository.findAndCount({
        select: ['id', 'name', 'desc', 'sort', 'calcMode', 'rules', 'enableFreeRules', 'freeRules', 'updatedTime'],
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
        skip: (page - 1) * pagesize,
        take: pagesize,
      })

      return {
        result: pipeDict(list, [
          row => objectToDict(row, 'calcMode', LOGISTIC_FREIGHT_CALC_MODES),
        ]),
        total,
        page,
        pagesize,
      }
    }
    catch (e) {
      throw new FailedException('获取运费模板列表', e.message)
    }
  }

  /**
   * 获取运费模板字典列表
   *
   * @returns 运费模板字典列表
   * @throws {FailedException} 获取运费模板字典列表失败
   */
  async findDictList(): Promise<ILogisticFreightTemplateDict[]> {
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
   * 获取运费模板信息
   *
   * @param id 运费模板 ID
   * @returns 运费模板信息
   * @throws {NotFoundException} 运费模板不存在
   * @throws {FailedException} 获取运费模板失败
   */
  async findById(id: number): Promise<ILogisticFreightTemplateInfo> {
    try {
      const template = await this.repository.findOne({
        select: ['id', 'name', 'desc', 'sort', 'calcMode', 'rules', 'enableFreeRules', 'freeRules'],
        where: { id },
      })

      if (!template)
        throw new NotFoundException('运费模板')

      return {
        ...template,
        calcMode: toDict(template.calcMode, LOGISTIC_FREIGHT_CALC_MODES),
      }
    }
    catch (e) {
      throw new FailedException('获取运费模板', e.message, e.status)
    }
  }

  /**
   * 创建运费模板
   *
   * @param data 运费模板信息
   * @throws {ExistsException} 运费模板已存在
   * @throws {FailedException} 创建运费模板失败
   */
  async create(data: FreightTemplatePayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name.trim(),
      })

      if (exists)
        throw new ExistsException('运费模板')

      const template = new LogisticFreightTemplate()

      template.name = data.name.trim()
      template.desc = data.desc ? data.desc.trim() : ''
      template.sort = data.sort || 1
      template.calcMode = data.calcMode
      template.rules = data.rules
      template.enableFreeRules = data.enableFreeRules || 0
      template.freeRules = data.freeRules || []

      const created = await this.repository.save(template)

      this.event.emit(
        toEventName(LogisticFreightTemplateCreateEvent.name),
        new LogisticFreightTemplateCreateEvent(created.id, created.name),
      )
    }
    catch (e) {
      throw new FailedException('创建运费模板', e.message, e.status)
    }
  }

  /**
   * 更新运费模板
   *
   * @param id 运费模板 ID
   * @param data 运费模板信息
   * @throws {NotFoundException} 运费模板不存在
   * @throws {ExistsException} 运费模板已存在
   * @throws {FailedException} 更新运费模板失败
   */
  async update(id: number, data: FreightTemplatePayload) {
    try {
      const template = await this.repository.findOne({
        select: ['id', 'name', 'desc', 'sort', 'calcMode', 'rules', 'enableFreeRules', 'freeRules'],
        where: { id },
      })

      if (!template)
        throw new NotFoundException('运费模板')

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name.trim(),
      })

      if (exists)
        throw new ExistsException('运费模板')

      template.name = data.name.trim()

      if (data.desc !== undefined)
        template.desc = data.desc.trim()

      if (data.sort !== undefined)
        template.sort = data.sort || 1

      if (data.calcMode !== undefined)
        template.calcMode = data.calcMode

      if (data.rules !== undefined)
        template.rules = data.rules

      if (data.enableFreeRules !== undefined)
        template.enableFreeRules = data.enableFreeRules

      if (data.freeRules !== undefined)
        template.freeRules = data.freeRules || []

      const updated = await this.repository.save(template)

      this.event.emit(
        toEventName(LogisticFreightTemplateUpdateEvent.name),
        new LogisticFreightTemplateUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新运费模板', e.message, e.status)
    }
  }

  /**
   * 删除运费模板
   *
   * @param id 运费模板 ID
   * @throws {FailedException} 删除运费模板失败
   */
  async delete(id: number) {
    try {
      const template = await this.repository.findOne({
        select: ['id', 'name'],
        where: { id },
      })

      if (template) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(LogisticFreightTemplateDeleteEvent.name),
          new LogisticFreightTemplateDeleteEvent(template.id, template.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除运费模板', e.message)
    }
  }
}
