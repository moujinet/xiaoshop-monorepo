import type { IGoodsAdditional, IGoodsAdditionalDict, IGoodsAdditionalListItem } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GoodsAdditional } from '@/goods/additional/entity'
import { GoodsAdditionalPayload } from '@/goods/additional/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class GoodsAdditionalService {
  constructor(
    @InjectRepository(GoodsAdditional)
    private readonly repository: Repository<GoodsAdditional>,
  ) {}

  /**
   * 获取商品附加服务列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsAdditionalListItem[]>
   * @see {@link IGoodsAdditionalListItem}
   */
  async findList(): Promise<IGoodsAdditionalListItem[]> {
    try {
      return await this.repository.find({
        select: {
          id: true,
          name: true,
          desc: true,
          icon: true,
          price: true,
          createdTime: true,
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品附加服务列表', e.message)
    }
  }

  /**
   * 获取商品附加服务字典列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsAdditionalDict[]>
   * @see {@link IGoodsAdditionalDict}
   */
  async findDictList(): Promise<IGoodsAdditionalDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name', 'price'],
      })
    }
    catch (e) {
      throw new FailedException('获取商品附加服务字典列表', e.message)
    }
  }

  /**
   * 获取商品附加服务详情
   *
   * @param id number
   * @throws NotFoundException
   * @throws FailedException
   * @returns Promise<IGoodsAdditional>
   * @see {@link IGoodsAdditional}
   */
  async findDetail(id: number): Promise<IGoodsAdditional> {
    try {
      const detail = await this.repository.findOne({
        where: {
          id,
        },
      })

      if (!detail)
        throw new NotFoundException('商品附加服务')

      return detail
    }
    catch (e) {
      throw new FailedException('获取商品附加服务详情', e.message, e.status)
    }
  }

  /**
   * 创建商品附加服务
   *
   * @param data GoodsAdditionalPayload
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsAdditionalPayload}
   */
  async create(data: GoodsAdditionalPayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品附加服务 [${data.name}] `)

      const service = new GoodsAdditional()

      service.name = data.name
      service.desc = data.desc || ''
      service.price = data.price || 0
      service.icon = data.icon || ''
      service.sort = data.sort || 1

      await this.repository.save(service)
    }
    catch (e) {
      throw new FailedException('创建商品附加服务', e.message, e.status)
    }
  }

  /**
   * 更新商品附加服务
   *
   * @param id number
   * @param data GoodsAdditionalPayload
   * @throws NotFoundException
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsAdditionalPayload}
   */
  async update(id: number, data: GoodsAdditionalPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`商品附加服务 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品附加服务 [${data.name}] `)

      const service = new GoodsAdditional()

      service.id = id
      service.name = data.name
      service.desc = data.desc || ''
      service.price = data.price || 0
      service.icon = data.icon || ''
      service.sort = data.sort || 1

      await this.repository.save(service)
    }
    catch (e) {
      throw new FailedException('更新商品附加服务', e.message, e.status)
    }
  }

  /**
   * 删除商品附加服务
   *
   * @param id number
   */
  async delete(id: number) {
    try {
      await this.repository.delete({ id })
    }
    catch (e) {
      throw new FailedException('删除商品附加服务', e.message)
    }
  }
}
