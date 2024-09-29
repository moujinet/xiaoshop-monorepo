import { InjectRepository } from '@nestjs/typeorm'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FindOptionsWhere, Not, Repository } from 'typeorm'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  type ISystemNotificationTemplateInfo,
  type ISystemNotificationTemplateList,
  ISystemUserDict,
  SystemUserStatus,
  YesOrNo,
} from '@xiaoshop/shared'

import { SYSTEM_USER_STATUSES } from '~/dicts'
import { ExistsException, FailedException } from '~/common/exceptions'
import { objectToDict, pipeDict, toDict, toEventName } from '~/utils/transformers'
import {
  SYSTEM_NOTIFICATION_CHANNELS,
  SYSTEM_NOTIFICATION_SCENES,
  SYSTEM_NOTIFICATION_TYPES,
} from '~~/src/dicts/system/notification'

import { SystemNotificationTemplateEntity } from './entity'
import { SystemNotificationTemplatePayload } from './dto/payload'
import { GetSystemNotificationTemplateListRequest } from './dto/request'
import {
  SystemNotificationTemplateDisableEvent,
  SystemNotificationTemplateEnableEvent,
  SystemNotificationTemplateUpdateEvent,
} from './events'

@Injectable()
export class SystemNotificationTemplateService {
  constructor(
    @InjectRepository(SystemNotificationTemplateEntity)
    private readonly repo: Repository<SystemNotificationTemplateEntity>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取通知模板列表
   *
   * @param query 查询条件
   * @returns 通知模板列表
   * @throws {FailedException} 获取通知模板列表失败
   */
  async findList(
    query: GetSystemNotificationTemplateListRequest,
  ): Promise<ISystemNotificationTemplateList[]> {
    try {
      const where: FindOptionsWhere<SystemNotificationTemplateEntity> = {}

      if (query.type)
        where.type = query.type

      if (query.scene)
        where.scene = query.scene

      const list = await this.repo.find({
        select: ['id', 'isEnabled', 'name', 'desc', 'channels', 'subscribers', 'updatedTime'],
        where,
        order: { updatedTime: 'DESC' },
      })

      return pipeDict<ISystemNotificationTemplateList>(list, [
        row => ({
          ...row,
          channels: row.channels.map(
            (channel: number) => toDict(channel, SYSTEM_NOTIFICATION_CHANNELS),
          ),
        }),
      ])
    }
    catch (e) {
      throw new FailedException('获取通知模板列表', e.message)
    }
  }

  /**
   * 获取通知模板信息
   *
   * @param id 通知模板 ID
   * @returns 通知模板信息
   * @throws {FailedException} 获取通知模板信息失败
   * @throws {NotFoundException} 通知模板不存在
   */
  async findById(id: number): Promise<ISystemNotificationTemplateInfo> {
    try {
      const template = await this.repo.findOne({
        select: {
          id: true,
          trigger: true,
          isEnabled: true,
          type: true,
          scene: true,
          name: true,
          desc: true,
          channels: true,
          contents: true,
          subscribers: { id: true, isAdmin: true, status: true, name: true },
        },
        where: { id },
        relations: ['subscribers'],
      })

      if (!template)
        throw new NotFoundException('通知模板信息')

      return {
        ...template,
        type: toDict(template.type, SYSTEM_NOTIFICATION_TYPES),
        scene: toDict(template.scene, SYSTEM_NOTIFICATION_SCENES),
        channels: template.channels.map(
          (channel: number) => toDict(channel, SYSTEM_NOTIFICATION_CHANNELS),
        ),
        subscribers: pipeDict<ISystemUserDict>(template.subscribers, [
          row => objectToDict(row, 'status', SYSTEM_USER_STATUSES),
        ]),
      }
    }
    catch (e) {
      throw new FailedException('获取通知模板信息', e.message)
    }
  }

  /**
   * 获取通知模板订阅者 ID 列表
   *
   * @param id 通知模板 ID
   * @returns 通知模板订阅者 ID 列表
   * @throws {FailedException} 获取通知模板订阅者 ID 列表失败
   * @throws {NotFoundException} 通知模板不存在
   */
  async findSubscribersById(id: number): Promise<ISystemUserDict[]> {
    try {
      const template = await this.repo.findOne({
        select: {
          id: true,
          subscribers: { id: true, isAdmin: true, status: true, name: true },
        },
        where: {
          id,
          subscribers: {
            status: SystemUserStatus.NORMAL,
          },
        },
        relations: ['subscribers'],
      })

      if (!template)
        throw new NotFoundException('通知模板信息')

      return pipeDict<ISystemUserDict>(template.subscribers, [
        row => objectToDict(row, 'status', SYSTEM_USER_STATUSES),
      ])
    }
    catch (e) {
      throw new FailedException('获取通知模板订阅者 ID 列表', e.message)
    }
  }

  /**
   * 更新通知模板信息
   *
   * @param id 通知模板 ID
   * @param data 通知模板信息
   * @throws {FailedException} 更新通知模板信息失败
   * @throws {NotFoundException} 通知模板不存在
   * @throws {ExistsException} 模板名称已存在
   */
  async update(id: number, data: SystemNotificationTemplatePayload) {
    try {
      const template = await this.repo.findOne({
        select: ['id', 'isEnabled', 'name', 'desc', 'channels', 'contents'],
        where: { id },
      })

      if (!template)
        throw new NotFoundException('通知模板信息')

      const isEnabled = template.isEnabled

      const exists = await this.repo.existsBy({
        id: Not(template.id),
        name: data.name.trim(),
      })

      if (exists)
        throw new ExistsException('通知模板信息')

      if (template.name !== data.name.trim())
        template.name = data.name.trim()

      if (template.desc !== data.desc.trim())
        template.desc = data.desc.trim()

      if (data.channels.length === 0)
        template.isEnabled = YesOrNo.NO

      template.channels = data.channels
      template.contents = data.contents

      await this.repo.save(template)

      this.event.emit(
        toEventName(SystemNotificationTemplateUpdateEvent.name),
        new SystemNotificationTemplateUpdateEvent(
          template.id,
          template.name,
        ),
      )

      if (isEnabled === YesOrNo.YES && template.isEnabled === YesOrNo.NO) {
        this.event.emit(
          toEventName(SystemNotificationTemplateDisableEvent.name),
          new SystemNotificationTemplateDisableEvent(
            template.id,
            template.name,
          ),
        )
      }
    }
    catch (e) {
      throw new FailedException('更新通知模板', e.message)
    }
  }

  /**
   * 启用通知模板
   *
   * @param id 通知模板 ID
   * @throws {FailedException} 启用通知模板失败
   * @throws {NotFoundException} 通知模板不存在
   */
  async enable(id: number) {
    try {
      const template = await this.repo.findOne({
        select: ['id', 'name', 'isEnabled'],
        where: { id },
      })

      if (!template)
        throw new NotFoundException('通知模板信息')

      if (template.isEnabled === YesOrNo.YES)
        return

      template.isEnabled = YesOrNo.YES

      await this.repo.save(template)

      this.event.emit(
        toEventName(SystemNotificationTemplateEnableEvent.name),
        new SystemNotificationTemplateEnableEvent(
          template.id,
          template.name,
        ),
      )
    }
    catch (e) {
      throw new FailedException('启用通知模板', e.message, e.status)
    }
  }

  /**
   * 停用通知模板
   *
   * @param id 通知模板 ID
   * @throws {FailedException} 停用通知模板失败
   * @throws {NotFoundException} 通知模板不存在
   */
  async disable(id: number) {
    try {
      const template = await this.repo.findOne({
        select: ['id', 'name', 'isEnabled'],
        where: { id },
      })

      if (!template)
        throw new NotFoundException('通知模板信息')

      if (template.isEnabled === YesOrNo.NO)
        return

      template.isEnabled = YesOrNo.NO

      await this.repo.save(template)

      this.event.emit(
        toEventName(SystemNotificationTemplateDisableEvent.name),
        new SystemNotificationTemplateDisableEvent(
          template.id,
          template.name,
        ),
      )
    }
    catch (e) {
      throw new FailedException('停用通知模板', e.message, e.status)
    }
  }
}
