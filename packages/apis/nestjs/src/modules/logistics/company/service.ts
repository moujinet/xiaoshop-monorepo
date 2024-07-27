import type { ILogisticsCompany, ILogisticsCompanyListItem } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LogisticsCompany } from '@/logistics/company/entity'
import { LogisticsCompanyPayload } from '@/logistics/company/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class LogisticsCompanyService {
  constructor(
    @InjectRepository(LogisticsCompany)
    private readonly repository: Repository<LogisticsCompany>,
  ) {}

  /**
   * 获取物流公司列表
   *
   * @throws FailedException
   * @returns Promise<ILogisticsCompanyListItem[]>
   * @see {@link ILogisticsCompanyListItem}
   */
  async findList(): Promise<ILogisticsCompanyListItem[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name', 'url', 'sort', 'updatedTime'],
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
   * @param id number
   * @throws FailedException
   * @throws NotFoundException
   * @returns Promise<ILogisticsCompany>
   * @see {@link ILogisticsCompany}
   */
  async findDetail(id: number): Promise<ILogisticsCompany> {
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
   * @param data LogisticsCompanyPayload
   * @throws FailedException
   * @throws ExistsException
   * @see {@link LogisticsCompanyPayload}
   */
  async create(data: LogisticsCompanyPayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name })

      if (exists)
        throw new ExistsException(`物流公司 [${data.name}] `)

      await this.repository.save(data)
    }
    catch (e) {
      throw new FailedException('创建物流公司', e.message, e.status)
    }
  }

  /**
   * 更新物流公司
   *
   * @param id number
   * @param data LogisticsCompanyPayload
   * @throws FailedException
   * @throws NotFoundException
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
    }
    catch (e) {
      throw new FailedException('更新物流公司', e.message, e.status)
    }
  }

  /**
   * 删除物流公司
   *
   * @param id number
   * @throws FailedException
   */
  async delete(id: number) {
    try {
      await this.repository.delete(id)
    }
    catch (e) {
      throw new FailedException('删除物流公司', e.message)
    }
  }
}
