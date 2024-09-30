import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  type ISystemNotificationTemplateContentList,
  type ISystemNotificationTemplateTriggerList,
  type ISystemUserDict,
  YesOrNo,
} from '@xiaoshop/shared'

import { SYSTEM_USER_STATUSES } from '~/dicts'
import { FailedException } from '~/common/exceptions'
import { objectToDict, pipeDict } from '~/utils/transformers'
import { SystemNotificationTemplateEntity } from '@/system/notification/template/entity'

@Injectable()
export class SystemNotificationTemplateSubscribeService {
  constructor(
    @InjectRepository(SystemNotificationTemplateEntity)
    private readonly repo: Repository<SystemNotificationTemplateEntity>,
  ) {}

  /**
   * 获取启用状态模板列表
   *
   * @returns 启用状态模板触发事件列表
   * @throws {FailedException} 获取启用模板列表失败
   */
  async findTriggers(): Promise<ISystemNotificationTemplateTriggerList[]> {
    try {
      return await this.repo.find({
        select: ['id', 'trigger'],
        where: {
          isEnabled: YesOrNo.YES,
        },
      })
    }
    catch (e) {
      throw new FailedException('获取启用模板触发事件列表', e.message)
    }
  }

  /**
   * 获取可发送通知模板内容列表
   *
   * @param trigger 通知模板触发事件
   * @returns 可发送通知模板内容
   * @throws {FailedException} 获取可发送通知模板内容列表失败
   */
  async findContentList(trigger: string): Promise<ISystemNotificationTemplateContentList[]> {
    try {
      const templates = await this.repo.find({
        select: {
          id: true,
          type: true,
          scene: true,
          channels: true,
          contents: true,
          subscribers: { id: true, isAdmin: true, status: true, name: true },
        },
        where: {
          isEnabled: YesOrNo.YES,
          trigger,
        },
      })

      if (!templates.length)
        return []

      const list: ISystemNotificationTemplateContentList[] = []

      for (const template of templates) {
        if (template.channels.length === 0 || template.contents.length === 0)
          continue

        const channelContents = template.contents.filter(
          c => template.channels.includes(c.channel),
        )

        for (const content of channelContents) {
          list.push({
            id: template.id,
            type: template.type,
            scene: template.scene,
            channel: content.channel,
            title: content.title,
            content: content.content,
            subscribers: template.subscribers
              ? pipeDict<ISystemUserDict>(template.subscribers, [
                row => objectToDict(row, 'status', SYSTEM_USER_STATUSES),
              ])
              : [],
          })
        }
      }

      return list
    }
    catch (e) {
      throw new FailedException('获取可发送通知模板内容列表', e.message)
    }
  }
}
