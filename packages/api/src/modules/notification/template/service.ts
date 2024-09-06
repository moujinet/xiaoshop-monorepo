import {
  INotificationTemplate,
  INotificationTemplateListItem,
  YesOrNo,
} from '@xiaoshop/shared'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FindOptionsWhere, Repository } from 'typeorm'
import { NotificationTemplate } from '@/notification/template/entity'
import {
  NotificationTemplateStatusUpdatedEvent,
} from '@/notification/template/events'
import {
  GetNotificationTemplateListRequest,
} from '@/notification/template/dto'
import {
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class NotificationTemplateService {
  constructor(
    @InjectRepository(NotificationTemplate)
    private readonly repository: Repository<NotificationTemplate>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取消息模板列表
   *
   * @param query 查询条件
   * @returns Promise<INotificationTemplateListItem[]>
   * @throws {FailedException} 获取消息模板列表失败
   */
  async findList(
    query: GetNotificationTemplateListRequest,
  ): Promise<INotificationTemplateListItem[]> {
    try {
      const where: FindOptionsWhere<NotificationTemplate> = {}

      if (query.scope)
        where.scope = query.scope

      if (query.scene)
        where.scene = query.scene

      return await this.repository.find({
        select: ['id', 'key', 'enable', 'scope', 'scene', 'channels', 'name', 'desc', 'updatedTime'],
        where,
        order: {
          scene: 'ASC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取消息模板列表', e.message)
    }
  }

  /**
   * 根据 ID 获取消息模板
   *
   * @param id 模板 ID
   * @returns Promise<INotificationTemplate>
   * @throws {FailedException} 获取消息模板失败
   * @throws {NotFoundException} 消息模板不存在
   */
  async findById(id: number): Promise<INotificationTemplate> {
    try {
      const template = await this.repository.findOne({
        where: {
          id,
        },
        relations: ['contents'],
      })

      if (!template)
        throw new NotFoundException('消息模板')

      return template
    }
    catch (e) {
      throw new FailedException('获取消息模板', e.message, e.status)
    }
  }

  /**
   * 根据 KEY 获取消息模板
   *
   * @param key 模板标识
   * @returns Promise<INotificationTemplate>
   * @throws {FailedException} 获取消息模板失败
   * @throws {NotFoundException} 消息模板不存在
   */
  async findByKey(key: string): Promise<INotificationTemplate> {
    try {
      const template = await this.repository.findOne({
        where: {
          key,
          enable: YesOrNo.YES,
        },
        relations: ['contents'],
      })

      if (!template)
        throw new NotFoundException('消息模板')

      return template
    }
    catch (e) {
      throw new FailedException('获取消息模板', e.message, e.status)
    }
  }

  /**
   * 更新消息模板状态
   *
   * @param id 模板 ID
   * @param enable 启用状态
   * @throws {NotFoundException} 消息模板不存在
   * @throws {FailedException} 更新消息模板状态失败
   * @event NotificationTemplateStatusUpdatedEvent
   */
  async updateStatus(id: number, enable: YesOrNo) {
    try {
      const template = await this.repository.findOneBy({ id })

      if (!template)
        throw new NotFoundException('消息模板')

      template.enable = enable

      await this.repository.save(template)

      this.event.emit(
        toEventName(NotificationTemplateStatusUpdatedEvent.name),
        new NotificationTemplateStatusUpdatedEvent(
          template.id,
          template.key,
          template.name,
          template.enable,
        ),
      )
    }
    catch (e) {
      throw new FailedException('更新消息模板状态', e.message, e.status)
    }
  }
}
