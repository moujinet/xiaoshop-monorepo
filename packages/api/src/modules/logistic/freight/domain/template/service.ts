import type { ILogisticFreightTemplateRepository } from '@/logistic/freight/model/interface'
import type { IApiPaginationData, ILogisticFreightTemplateDict, ILogisticFreightTemplateInfo, ILogisticFreightTemplateList, YesOrNo } from '@xiaoshop/shared'

import { Not } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { LogisticFreightTemplateRepo } from '@/logistic/freight/model/provider'
import { GetLogisticFreightTemplatePagesRequest } from '@/logistic/freight/dto/request'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'
import { toLogisticFreightInfo, toLogisticFreightList } from '@/logistic/freight/model/mapper'
import { CreateLogisticFreightTemplatePayload, UpdateLogisticFreightTemplatePayload } from '@/logistic/freight/dto/payload'

import { LogisticFreightTemplateCreateEvent, LogisticFreightTemplateDeleteEvent, LogisticFreightTemplateUpdateEvent } from './events'

@Injectable()
export class LogisticFreightTemplateService {
  constructor(
    @LogisticFreightTemplateRepo()
    private readonly repo: ILogisticFreightTemplateRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取运费模板分页列表
   *
   * @param query 查询条件
   * @returns 运费模板分页列表
   * @throws {FailedException} 获取运费模板分页列表失败
   */
  async findPages(
    query: GetLogisticFreightTemplatePagesRequest,
  ): Promise<IApiPaginationData<ILogisticFreightTemplateList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(page, pagesize).then(
        ({ list, total, page, pagesize }) => ({
          list: toLogisticFreightList(list),
          total,
          page,
          pagesize,
        }),
      )
    }
    catch (e) {
      throw new FailedException('获取运费模板分页列表', e.message)
    }
  }

  /**
   * 获取运费模板字典列表
   *
   * @param isEnabled 运费模板状态
   * @returns 运费模板字典列表
   * @throws {FailedException} 获取运费模板字典列表失败
   */
  async findDictList(isEnabled?: YesOrNo): Promise<ILogisticFreightTemplateDict[]> {
    try {
      return await this.repo.find({ isEnabled }, ['id', 'name'])
    }
    catch (e) {
      throw new FailedException('获取运费模板字典列表', e.message)
    }
  }

  /**
   * 获取运费模板详情
   *
   * @param id 运费模板 ID
   * @returns 获取运费模板详情失败
   */
  async findById(id: number): Promise<ILogisticFreightTemplateInfo> {
    try {
      const template = await this.repo.findById(id)

      if (!template)
        throw new NotFoundException('运费模板')

      return toLogisticFreightInfo(template)
    }
    catch (e) {
      throw new FailedException('获取运费模板详情', e.message, e.code)
    }
  }

  /**
   * 创建运费模板
   *
   * @param data 创建数据
   * @throws {FailedException} 创建运费模板失败
   * @throws {ExistsException} 运费模板已存在
   */
  async create(data: CreateLogisticFreightTemplatePayload) {
    try {
      if (await this.repo.exists({ name: data.name.trim() }))
        throw new ExistsException('运费模板')

      const template = await this.repo.create(data)

      this.event.emit(
        new LogisticFreightTemplateCreateEvent(template.id, template.name),
      )
    }
    catch (e) {
      throw new FailedException('创建运费模板', e.message, e.code)
    }
  }

  /**
   * 更新运费模板
   *
   * @param id 运费模板 ID
   * @param data 更新数据
   * @throws {FailedException} 更新运费模板失败
   * @throws {NotFoundException} 运费模板不存在
   * @throws {ExistsException} 运费模板已存在
   */
  async update(id: number, data: UpdateLogisticFreightTemplatePayload) {
    try {
      const template = await this.repo.findById(id)

      if (!template)
        throw new NotFoundException('运费模板')

      if (await this.repo.exists({ id: Not(id), name: data.name.trim() }))
        throw new ExistsException('运费模板')

      const updated = await this.repo.update(template, data)

      this.event.emit(
        new LogisticFreightTemplateUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新运费模板', e.message, e.code)
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
      const template = await this.repo.findById(id, ['id', 'name'])

      if (template) {
        await this.repo.destroy(template.id)

        this.event.emit(
          new LogisticFreightTemplateDeleteEvent(template.id, template.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除运费模板', e.message)
    }
  }
}
