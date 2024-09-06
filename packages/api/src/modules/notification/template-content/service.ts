import type {
  INotificationTemplateContentInfo,
} from '@xiaoshop/shared'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { NotificationTemplateContent } from '@/notification/template-content/entity'
import { UpdateNotificationTemplateContentPayload } from '@/notification/template-content/dto'
import { NotificationTemplateContentUpdatedEvent } from '@/notification/template-content/events'
import { FailedException, NotFoundException } from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class NotificationTemplateContentService {
  constructor(
    @InjectRepository(NotificationTemplateContent)
    private readonly repository: Repository<NotificationTemplateContent>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取消息模板内容列表
   *
   * @param templateId 模板 ID
   * @returns Promise<INotificationTemplateContentInfo[]>
   * @throws {FailedException} 获取消息模板内容列表失败
   */
  async findList(templateId: number): Promise<INotificationTemplateContentInfo[]> {
    try {
      return await this.repository.find({
        select: ['id', 'channel', 'title', 'content'],
        where: {
          templateId,
        },
        order: {
          channel: 'ASC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取消息模板内容列表', e.message)
    }
  }

  /**
   * 更新消息模板内容
   *
   * @param id 模板内容 ID
   * @param data 模板内容
   * @throws {FailedException} 更新消息模板内容失败
   * @throws {NotFoundException} 消息模板内容不存在
   * @event NotificationTemplateContentUpdatedEvent
   */
  async update(
    id: number,
    data: UpdateNotificationTemplateContentPayload,
  ) {
    try {
      const content = await this.repository.findOne({
        select: {
          template: { id: true, name: true },
        },
        where: {
          id,
        },
        relations: ['template'],
      })

      if (!content)
        throw new NotFoundException('消息模板内容')

      content.title = data.title || content.title
      content.content = data.content || content.content

      await this.repository.save(content)

      this.event.emit(
        toEventName(NotificationTemplateContentUpdatedEvent.name),
        new NotificationTemplateContentUpdatedEvent(
          content.template.id,
          content.template.name,
          content.channel,
        ),
      )
    }
    catch (e) {
      throw new FailedException('更新消息模板内容', e.message, e.status)
    }
  }
}
