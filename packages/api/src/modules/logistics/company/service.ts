import type {
  ILogisticsCompany,
  ILogisticsCompanyListItem,
} from '@xiaoshop/shared'
import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { LogisticsCompany } from '@/logistics/company/entity'
import { LogisticsCompanyPayload } from '@/logistics/company/dto'
import {
  LogisticsCompanyCreatedEvent,
  LogisticsCompanyDeletedEvent,
  LogisticsCompanyUpdatedEvent,
} from '@/logistics/company/events'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class LogisticsCompanyService {
  constructor(
    @InjectRepository(LogisticsCompany)
    private readonly repository: Repository<LogisticsCompany>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取物流公司列表
   *
   * @throws {FailedException} 获取物流公司列表失败
   * @returns Promise<ILogisticsCompanyListItem[]>
   * @see {@link ILogisticsCompanyListItem}
   */
  async findList(): Promise<ILogisticsCompanyListItem[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name', 'desc', 'url', 'sort', 'updatedTime'],
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取物流公司列表', e.message)
    }
  }

  /**
   * 获取物流公司详情
   *
   * @param id 物流公司 ID
   * @throws {FailedException} 获取物流公司详情失败
   * @throws {NotFoundException} 物流公司不存在
   * @returns Promise<ILogisticsCompany>
   * @see {@link ILogisticsCompany}
   */
  async findById(id: number): Promise<ILogisticsCompany> {
    try {
      const detail = await this.repository.findOneBy({ id })

      if (!detail)
        throw new NotFoundException('物流公司')

      return detail
    }
    catch (e) {
      throw new FailedException('获取物流公司详情', e.message, e.status)
    }
  }

  /**
   * 创建物流公司
   *
   * @param data 物流公司信息
   * @throws {FailedException} 创建物流公司失败
   * @throws {ExistsException} 物流公司已存在
   * @event LogisticsCompanyCreatedEvent
   * @see {@link LogisticsCompanyPayload}
   */
  async create(data: LogisticsCompanyPayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`物流公司 [${data.name}] `)

      const company = await this.repository.save(data)

      this.event.emit(
        toEventName(LogisticsCompanyCreatedEvent.name),
        new LogisticsCompanyCreatedEvent(company.id, company.name),
      )
    }
    catch (e) {
      throw new FailedException('创建物流公司', e.message, e.status)
    }
  }

  /**
   * 更新物流公司
   *
   * @param id 物流公司 ID
   * @param data 物流公司信息
   * @throws {FailedException} 更新物流公司失败
   * @throws {NotFoundException} 物流公司不存在
   * @see {@link LogisticsCompanyPayload}
   */
  async update(id: number, data: LogisticsCompanyPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`物流公司 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`物流公司 [${data.name}] `)

      await this.repository.update(id, data)

      this.event.emit(
        toEventName(LogisticsCompanyUpdatedEvent.name),
        new LogisticsCompanyUpdatedEvent(id, data.name),
      )
    }
    catch (e) {
      throw new FailedException('更新物流公司', e.message, e.status)
    }
  }

  /**
   * 删除物流公司
   *
   * @param id 物流公司 ID
   * @throws {FailedException} 删除物流公司失败
   */
  async delete(id: number) {
    try {
      const company = await this.repository.findOneBy({ id })

      if (company) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(LogisticsCompanyDeletedEvent.name),
          new LogisticsCompanyDeletedEvent(id, company.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除物流公司', e.message)
    }
  }
}
