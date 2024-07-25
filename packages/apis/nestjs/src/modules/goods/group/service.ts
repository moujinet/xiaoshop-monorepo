import type { IGoodsGroup, IGoodsGroupDict } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GoodsGroup } from '@/goods/group/entity'
import { GoodsGroupPayload } from '@/goods/group/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class GoodsGroupService {
  constructor(
    @InjectRepository(GoodsGroup)
    private readonly repository: Repository<GoodsGroup>,
  ) {}

  /**
   * 获取商品分组列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsGroup[]>
   * @see {@link IGoodsGroup}
   */
  async findList(): Promise<IGoodsGroup[]> {
    try {
      return await this.repository.find()
    }
    catch (e) {
      throw new FailedException('获取商品分组列表', e.message)
    }
  }

  /**
   * 获取商品分组字典列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsGroupDict[]>
   * @see {@link IGoodsGroupDict}
   */
  async findDictList(): Promise<IGoodsGroupDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
      })
    }
    catch (e) {
      throw new FailedException('获取商品分组字典列表', e.message)
    }
  }

  /**
   * 获取商品分组详情
   *
   * @param id number
   * @throws NotFoundException
   * @throws FailedException
   * @returns Promise<IGoodsGroup>
   * @see {@link IGoodsGroup}
   */
  async findDetail(id: number): Promise<IGoodsGroup> {
    try {
      const detail = await this.repository.findOne({
        where: { id },
      })

      if (!detail)
        throw new NotFoundException('商品分组')

      return detail
    }
    catch (e) {
      throw new FailedException('获取商品分组详情', e.message, e.status)
    }
  }

  /**
   * 创建商品分组
   *
   * @param data GoodsGroupPayload
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsGroupPayload}
   */
  async create(data: GoodsGroupPayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品分组 [${data.name}] `)

      const goodsGroup = new GoodsGroup()

      goodsGroup.name = data.name
      goodsGroup.sort = data.sort

      await this.repository.save(goodsGroup)
    }
    catch (e) {
      throw new FailedException('创建商品分组', e.message, e.status)
    }
  }

  /**
   * 更新商品分组
   *
   * @param id number
   * @param data GoodsGroupPayload
   * @throws NotFoundException
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsGroupPayload}
   */
  async update(id: number, data: GoodsGroupPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`商品分组 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品分组 [${data.name}] `)

      const goodsGroup = new GoodsGroup()

      goodsGroup.id = id
      goodsGroup.name = data.name
      goodsGroup.sort = data.sort

      await this.repository.save(goodsGroup)
    }
    catch (e) {
      throw new FailedException('更新商品分组', e.message, e.status)
    }
  }

  /**
   * 删除商品分组
   *
   * @param id number
   */
  async delete(id: number) {
    try {
      await this.repository.delete({ id })
    }
    catch (e) {
      throw new FailedException('删除商品分组', e.message)
    }
  }
}
