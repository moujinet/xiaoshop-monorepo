import type { ISystemMessageSendJob } from '@/system/message/interface'

import { Inject, Injectable } from '@nestjs/common'
import { type ISystemUserDict, SystemMessageType } from '@xiaoshop/shared'

import { replaceVariables } from '~/utils'

import { SystemMessageService } from '../service'

@Injectable()
export class SystemMessageChannel {
  constructor(
    @Inject(SystemMessageService)
    private readonly message: SystemMessageService,
  ) {}

  /**
   * 发送商家系统消息
   *
   * @param seller 后台用户字典信息
   * @param job 消息发送任务
   * @throws {FailedException} 发送失败
   */
  async sendToSeller(
    seller: ISystemUserDict,
    job: ISystemMessageSendJob,
  ) {
    const {
      templateId,
      scene,
      title: rawTitle,
      content: rawContent,
    } = job

    let title = rawTitle
    let content = rawContent
    let extras = job.extras || {}

    extras = { ...extras, userName: seller.name }
    title = replaceVariables(rawTitle, extras)
    content = replaceVariables(rawContent, extras)

    await this.message.send(templateId, {
      receiverId: seller.id,
      type: SystemMessageType.SELLER,
      scene,
      title,
      content,
      extras,
    })
  }

  /**
   * 发送买家系统消息
   *
   * @param job 消息发送任务
   * @throws {FailedException} 发送失败
   * @throws {FailedException} 缺少接收者信息
   */
  async sendToBuyer(job: ISystemMessageSendJob) {
    const {
      templateId,
      scene,
      title: rawTitle,
      content: rawContent,
    } = job

    let title = rawTitle
    let content = rawContent
    let extras = job.extras || {}

    if (!('receiverName' in extras) || !('receiverId' in extras))
      return false

    extras = { ...extras, userName: extras.receiverName }
    title = replaceVariables(rawTitle, extras)
    content = replaceVariables(rawContent, extras)

    await this.message.send(templateId, {
      receiverId: extras.receiverId,
      type: SystemMessageType.SELLER,
      scene,
      title,
      content,
      extras,
    })
  }
}
