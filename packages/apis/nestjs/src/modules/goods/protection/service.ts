import type { IGoodsProtection, IGoodsProtectionDict, IGoodsProtectionListItem } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GoodsProtection } from '@/goods/protection/entity'
import { GoodsProtectionPayload } from '@/goods/protection/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'
import { StaffLogService } from '@/staff/log/service'

@Injectable()
export class GoodsProtectionService {
  constructor(
    @InjectRepository(GoodsProtection)
    private readonly repository: Repository<GoodsProtection>,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {}

  /**
   * 获取商品保障服务列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsProtectionListItem[]>
   * @see {@link IGoodsProtectionListItem}
   */
  async findList(): Promise<IGoodsProtectionListItem[]> {
    try {
      return await this.repository.find({
        select: {
          id: true,
          name: true,
          desc: true,
          icon: true,
          updatedTime: true,
        },
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品保障服务列表', e.message)
    }
  }

  /**
   * 获取商品服务保障字典列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsProtectionDict[]>
   * @see {@link IGoodsProtectionDict}
   */
  async findDictList(): Promise<IGoodsProtectionDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name', 'icon'],
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品服务保障字典列表', e.message)
    }
  }

  /**
   * 获取商品保障服务详情
   *
   * @param id number
   * @throws NotFoundException
   * @throws FailedException
   * @returns Promise<IGoodsProtection>
   * @see {@link IGoodsProtection}
   */
  async findDetail(id: number): Promise<IGoodsProtection> {
    try {
      const detail = await this.repository.findOne({
        where: {
          id,
        },
      })

      if (!detail)
        throw new NotFoundException('商品保障服务')

      return detail
    }
    catch (e) {
      throw new FailedException('获取商品保障服务详情', e.message, e.status)
    }
  }

  /**
   * 创建商品保障服务
   *
   * @param data GoodsProtectionPayload
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsProtectionPayload}
   */
  async create(data: GoodsProtectionPayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品保障服务 [${data.name}] `)

      const service = new GoodsProtection()

      service.name = data.name
      service.desc = data.desc || ''
      service.icon = data.icon || ''
      service.sort = data.sort || 1

      await this.repository.save(service)

      await this.log.write('商品管理', `创建商品保障服务「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('创建商品保障服务', e.message, e.status)
    }
  }

  /**
   * 更新商品保障服务
   *
   * @param id number
   * @param data GoodsProtectionPayload
   * @throws NotFoundException
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsProtectionPayload}
   */
  async update(id: number, data: GoodsProtectionPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`商品保障服务 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品保障服务 [${data.name}] `)

      const service = new GoodsProtection()

      service.id = id
      service.name = data.name
      service.desc = data.desc || ''
      service.icon = data.icon || ''
      service.sort = data.sort || 1

      await this.repository.save(service)

      await this.log.write('商品管理', `更新商品保障服务「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('更新商品保障服务', e.message, e.status)
    }
  }

  /**
   * 删除商品保障服务
   *
   * @param id number
   */
  async delete(id: number) {
    try {
      const service = await this.repository.findOneBy({ id })

      if (service) {
        await this.repository.delete({ id })
        await this.log.write('商品管理', `删除商品保障服务「${service.name}」`)
      }
    }
    catch (e) {
      throw new FailedException('删除商品保障服务', e.message)
    }
  }
}
