import type { IGoodsAddition, IGoodsAdditionDict, IGoodsAdditionListItem } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GoodsAddition } from '@/goods/addition/entity'
import { GoodsAdditionPayload } from '@/goods/addition/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'
import { StaffLogService } from '@/staff/log/service'

@Injectable()
export class GoodsAdditionService {
  constructor(
    @InjectRepository(GoodsAddition)
    private readonly repository: Repository<GoodsAddition>,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {}

  /**
   * 获取商品附加服务列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsAdditionListItem[]>
   * @see {@link IGoodsAdditionListItem}
   */
  async findList(): Promise<IGoodsAdditionListItem[]> {
    try {
      return await this.repository.find({
        select: {
          id: true,
          name: true,
          desc: true,
          icon: true,
          price: true,
          updatedTime: true,
        },
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
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
   * @returns Promise<IGoodsAdditionDict[]>
   * @see {@link IGoodsAdditionDict}
   */
  async findDictList(): Promise<IGoodsAdditionDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name', 'icon', 'price'],
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
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
   * @returns Promise<IGoodsAddition>
   * @see {@link IGoodsAddition}
   */
  async findDetail(id: number): Promise<IGoodsAddition> {
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
   * @param data GoodsAdditionPayload
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsAdditionPayload}
   */
  async create(data: GoodsAdditionPayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品附加服务 [${data.name}] `)

      const service = new GoodsAddition()

      service.name = data.name
      service.desc = data.desc || ''
      service.price = data.price || 0
      service.icon = data.icon || ''
      service.sort = data.sort || 1

      await this.repository.save(service)
      await this.log.write('商品管理', `创建商品附加服务「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('创建商品附加服务', e.message, e.status)
    }
  }

  /**
   * 更新商品附加服务
   *
   * @param id number
   * @param data GoodsAdditionPayload
   * @throws NotFoundException
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsAdditionPayload}
   */
  async update(id: number, data: GoodsAdditionPayload) {
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

      const service = new GoodsAddition()

      service.id = id
      service.name = data.name
      service.desc = data.desc || ''
      service.price = data.price || 0
      service.icon = data.icon || ''
      service.sort = data.sort || 1

      await this.repository.save(service)
      await this.log.write('商品管理', `更新商品附加服务「${data.name}」`)
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
      const service = await this.repository.findOneBy({ id })

      if (service) {
        await this.repository.delete({ id })
        await this.log.write('商品管理', `删除商品附加服务「${service.name}」`)
      }
    }
    catch (e) {
      throw new FailedException('删除商品附加服务', e.message)
    }
  }
}
