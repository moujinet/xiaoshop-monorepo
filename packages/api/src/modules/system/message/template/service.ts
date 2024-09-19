import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FindOptionsWhere, Not, Repository } from 'typeorm'
import {
  type ISystemMessageTemplateContentList,
  type ISystemMessageTemplateInfo,
  type ISystemMessageTemplateList,
  type ISystemUserDict,
  type ISystemUserInfo,
  SYSTEM_MESSAGE_CHANNELS,
  SYSTEM_MESSAGE_SCENES,
  SYSTEM_MESSAGE_TYPES,
  SYSTEM_USER_STATUSES,
  YesOrNo,
} from '@xiaoshop/shared'

import { SystemUser } from '@/system/auth/user/entity'
import { objectToDict, pipeDict, toDict, toEventName } from '~/utils/transformers'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'

import { SystemMessageTemplate } from './entity'
import { GetSystemMessageTemplateListRequest, SystemMessageTemplatePayload } from './dto'
import {
  SystemMessageTemplateDisableEvent,
  SystemMessageTemplateEnableEvent,
  SystemMessageTemplateUpdateEvent,
} from './events'

@Injectable()
export class SystemMessageTemplateService {
  constructor(
    @InjectRepository(SystemMessageTemplate)
    private readonly repository: Repository<SystemMessageTemplate>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取消息模板列表
   *
   * @param query 查询条件
   * @returns 消息模板列表
   * @throws {FailedException} 获取消息模板列表失败
   */
  async findList(
    query: GetSystemMessageTemplateListRequest,
  ): Promise<ISystemMessageTemplateList[]> {
    try {
      const where: FindOptionsWhere<SystemMessageTemplate> = {}

      if (query.type)
        where.type = query.type

      if (query.scene)
        where.scene = query.scene

      const list = await this.repository.find({
        select: ['id', 'isEnabled', 'name', 'desc', 'channels', 'updatedTime'],
        where,
        order: { updatedTime: 'DESC' },
      })

      return pipeDict<ISystemMessageTemplateList>(list, [
        row => ({
          ...row,
          channels: row.channels.map((channel: number) => toDict(channel, SYSTEM_MESSAGE_CHANNELS)),
        }),
      ])
    }
    catch (e) {
      throw new FailedException('获取消息模板列表', e.message)
    }
  }

  /**
   * 获取消息模板信息
   *
   * @param id 消息模板 ID
   * @returns 消息模板信息
   * @throws {FailedException} 获取消息模板信息失败
   * @throws {NotFoundException} 消息模板不存在
   */
  async findById(id: number): Promise<ISystemMessageTemplateInfo> {
    try {
      const template = await this.repository.findOne({
        select: ['id', 'key', 'isEnabled', 'type', 'scene', 'name', 'desc', 'channels', 'contents'],
        where: { id },
      })

      if (!template)
        throw new NotFoundException('消息模板信息')

      return {
        ...template,
        type: toDict(template.type, SYSTEM_MESSAGE_TYPES),
        scene: toDict(template.scene, SYSTEM_MESSAGE_SCENES),
        channels: template.channels.map((channel: number) => toDict(channel, SYSTEM_MESSAGE_CHANNELS)),
      }
    }
    catch (e) {
      throw new FailedException('获取消息模板信息', e.message)
    }
  }

  /**
   * 获取可发送消息模板内容列表
   *
   * @param key 模板标识
   * @returns 模板内容列表
   * @throws {FailedException} 获取模板内容列表失败
   */
  async findContentListByKey(key: string): Promise<ISystemMessageTemplateContentList[]> {
    try {
      const result = await this.repository.find({
        select: ['id', 'type', 'name', 'channels', 'contents'],
        where: {
          key,
          isEnabled: YesOrNo.YES,
        },
      })

      const list: ISystemMessageTemplateContentList[] = []

      if (!result.length)
        return list

      for (const tpl of result) {
        tpl.contents
          .filter(c => tpl.channels.includes(c.channel))
          .forEach((content) => {
            list.push({
              id: tpl.id,
              type: toDict(tpl.type, SYSTEM_MESSAGE_TYPES),
              scene: toDict(tpl.scene, SYSTEM_MESSAGE_SCENES),
              ...content,
              channel: toDict(content.channel, SYSTEM_MESSAGE_CHANNELS),
            })
          })
      }

      return list
    }
    catch (e) {
      throw new FailedException('获取消息模板内容列表', e.message)
    }
  }

  /**
   * 获取消息模板订阅者列表
   *
   * @param id 消息模板 ID
   * @returns 消息模板订阅者列表
   * @throws {FailedException} 获取消息模板订阅者列表失败
   * @throws {NotFoundException} 消息模板不存在
   */
  async findSubscribersById(id: number): Promise<ISystemUserDict[]> {
    try {
      const template = await this.repository.findOne({
        select: {
          id: true,
          subscribers: { id: true, isAdmin: true, status: true, name: true },
        },
        relations: ['subscribers'],
        where: { id },
      })

      if (!template)
        throw new NotFoundException('消息模板信息')

      return pipeDict<ISystemUserDict>(template.subscribers, [
        row => objectToDict(row, 'status', SYSTEM_USER_STATUSES),
      ])
    }
    catch (e) {
      throw new FailedException('获取消息模板订阅者列表', e.message, e.status)
    }
  }

  /**
   * 更新消息模板信息
   *
   * @param id 消息模板 ID
   * @param data 消息模板信息
   * @throws {FailedException} 更新消息模板信息失败
   * @throws {NotFoundException} 消息模板不存在
   * @throws {ExistsException} 模板名称已存在
   */
  async update(id: number, data: SystemMessageTemplatePayload) {
    try {
      const template = await this.repository.findOne({
        select: ['id', 'isEnabled', 'name', 'desc', 'channels', 'contents'],
        where: { id },
      })

      if (!template)
        throw new NotFoundException('消息模板信息')

      const isEnabled = template.isEnabled

      const exists = await this.repository.existsBy({
        id: Not(template.id),
        name: data.name.trim(),
      })

      if (exists)
        throw new ExistsException('消息模板信息')

      if (template.name !== data.name.trim())
        template.name = data.name.trim()

      if (template.desc !== data.desc.trim())
        template.desc = data.desc.trim()

      if (data.channels.length === 0)
        template.isEnabled = YesOrNo.NO

      template.channels = data.channels
      template.contents = data.contents

      await this.repository.save(template)

      this.event.emit(
        toEventName(SystemMessageTemplateUpdateEvent.name),
        new SystemMessageTemplateUpdateEvent(
          template.id,
          template.name,
        ),
      )

      if (isEnabled === YesOrNo.YES && template.isEnabled === YesOrNo.NO) {
        this.event.emit(
          toEventName(SystemMessageTemplateDisableEvent.name),
          new SystemMessageTemplateDisableEvent(
            template.id,
            template.name,
          ),
        )
      }
    }
    catch (e) {
      throw new FailedException('更新消息模板', e.message)
    }
  }

  /**
   * 更新消息模板订阅者
   *
   * @param id 消息模板 ID
   * @param subscribers 订阅者 ID 数组
   * @throws {FailedException} 更新消息模板订阅者失败
   * @throws {NotFoundException} 消息模板不存在
   */
  async updateSubscribers(id: number, subscribers: ISystemUserInfo['id'][]) {
    try {
      const template = await this.repository.findOne({
        select: {
          id: true,
          subscribers: { id: true },
        },
        where: { id },
        relations: ['subscribers'],
      })

      if (!template)
        throw new NotFoundException('消息模板信息')

      template.subscribers = []

      if (subscribers.length > 0) {
        for (const sid of subscribers) {
          const subscriber = new SystemUser()

          subscriber.id = sid
          template.subscribers.push(subscriber)
        }
      }

      await this.repository.save(template)
    }
    catch (e) {
      throw new FailedException('更新消息模板订阅者', e.message, e.status)
    }
  }

  /**
   * 更新消息模板启用状态
   *
   * @param id 消息模板 ID
   * @param isEnabled 启用状态
   * @throws {FailedException} 更新消息模板状态失败
   * @throws {NotFoundException} 消息模板不存在
   */
  async updateStatus(id: number, isEnabled: YesOrNo) {
    try {
      const template = await this.repository.findOne({
        select: ['id', 'name'],
        where: { id },
      })

      if (!template)
        throw new NotFoundException('消息模板信息')

      template.isEnabled = isEnabled

      await this.repository.save(template)

      if (isEnabled === YesOrNo.YES) {
        this.event.emit(
          toEventName(SystemMessageTemplateEnableEvent.name),
          new SystemMessageTemplateEnableEvent(
            template.id,
            template.name,
          ),
        )
      }
      else {
        this.event.emit(
          toEventName(SystemMessageTemplateDisableEvent.name),
          new SystemMessageTemplateDisableEvent(
            template.id,
            template.name,
          ),
        )
      }
    }
    catch (e) {
      throw new FailedException('更新消息模板状态', e.message, e.status)
    }
  }
}
