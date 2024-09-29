import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { toEventName } from '~/utils/transformers'
import { FailedException } from '~/common/exceptions'
import { SystemSettingEntity } from '@/system/setting/entity'

import { SystemSettingUpdateEvent } from './events'
import { UpdateSystemSettingPayload } from './dto/payload'

@Injectable()
export class SystemSettingAdminService {
  constructor(
    @InjectRepository(SystemSettingEntity)
    private readonly repo: Repository<SystemSettingEntity>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 更新系统设置
   *
   * @param settings 系统设置列表
   * @throws {FailedException} 更新系统设置失败
   */
  async update(settings: UpdateSystemSettingPayload[]) {
    try {
      await Promise.all(
        settings.map(async ({ key, value }) => {
          await this.repo.update(key, { value })

          this.event.emit(
            toEventName(SystemSettingUpdateEvent.name),
            new SystemSettingUpdateEvent(key, value),
          )
        }),
      )
    }
    catch (e) {
      throw new FailedException('更新系统设置', e.message)
    }
  }
}
