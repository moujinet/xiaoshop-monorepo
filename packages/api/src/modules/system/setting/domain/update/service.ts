import type { ISystemSettingRepository } from '@/system/setting/model/interface'

import { Inject, Injectable } from '@nestjs/common'

import { FailedException } from '~/common/exceptions'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { SystemSettingRepo } from '@/system/setting/model/provider'
import { UpdateSystemSettingPayload } from '@/system/setting/dto/payload'
import { SystemSettingUpdateEvent } from '@/system/setting/domain/update/events'

@Injectable()
export class SystemSettingUpdateService {
  constructor(
    @SystemSettingRepo()
    private readonly repo: ISystemSettingRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 更新系统设置
   *
   * @param data 系统设置项
   * @throws {FailedException} 更新系统设置失败
   */
  async update(data: UpdateSystemSettingPayload[]) {
    try {
      await this.repo.update(data)

      for (const { key, value } of data) {
        this.event.emit(new SystemSettingUpdateEvent(key, value))
      }
    }
    catch (e) {
      throw new FailedException('更新系统设置', e.message)
    }
  }
}
