import type { IGoodsCategory, IGoodsCategoryDict, IGoodsCategoryListItem, IGoodsCategoryNestedDict } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GoodsCategory } from '@/goods/category/entity'
import { GetGoodsCategoryListRequest, GoodsCategoryPayload } from '@/goods/category/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class GoodsCategoryService {
  constructor(
    @InjectRepository(GoodsCategory)
    private readonly repository: Repository<GoodsCategory>,
  ) {}

  /**
   * 获取商品分类列表
   *
   * @param query GetGoodsCategoryListRequest
   * @throws FailedException
   * @returns Promise<IGoodsCategoryListItem[]>
   * @see {@link IGoodsCategoryListItem}
   */
  async findList(query: GetGoodsCategoryListRequest): Promise<IGoodsCategoryListItem[]> {
    try {
      const where = query.parentId ? { parentId: query.parentId } : {}

      return await this.repository.find({
        select: {
          id: true,
          parentId: true,
          name: true,
          image: true,
          sort: true,
          updatedTime: true,
        },
        where,
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品分类列表', e.message)
    }
  }

  /**
   * 获取商品分类根列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsCategoryDict[]>
   * @see {@link IGoodsCategoryDict}
   */
  async findRootList(): Promise<IGoodsCategoryDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        where: {
          parentId: 0,
        },
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品分类根列表', e.message)
    }
  }

  /**
   * 获取商品分类层级列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsCategoryNestedDict[]>
   * @see {@link IGoodsCategoryNestedDict}
   */
  async findNestedList(): Promise<IGoodsCategoryNestedDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'parentId', 'name'],
        order: {
          sort: 'ASC',
          parentId: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品分类根列表', e.message)
    }
  }

  /**
   * 获取商品分类详情
   *
   * @param id number
   * @throws NotFoundException
   * @throws FailedException
   * @returns Promise<IGoodsCategory>
   * @see {@link IGoodsCategory}
   */
  async findDetail(id: number): Promise<IGoodsCategory> {
    try {
      const detail = await this.repository.findOne({
        where: { id },
      })

      if (!detail)
        throw new NotFoundException('商品分类')

      return detail
    }
    catch (e) {
      throw new FailedException('获取商品分类详情', e.message, e.status)
    }
  }

  /**
   * 创建商品分类
   *
   * @param data GoodsCategoryPayload
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsCategoryPayload}
   */
  async create(data: GoodsCategoryPayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品分类 [${data.name}] `)

      const category = new GoodsCategory()

      category.parentId = data.parentId || 0
      category.name = data.name
      category.image = data.image || ''
      category.sort = data.sort || 1

      await this.repository.save(category)
    }
    catch (e) {
      throw new FailedException('创建商品分类', e.message, e.status)
    }
  }

  /**
   * 更新商品分类
   *
   * @param id number
   * @param data GoodsCategoryPayload
   * @throws NotFoundException
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsCategoryPayload}
   */
  async update(id: number, data: GoodsCategoryPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`商品分类 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品分类 [${data.name}] `)

      const category = new GoodsCategory()

      category.id = id
      category.parentId = data.parentId || 0
      category.name = data.name
      category.image = data.image || ''
      category.sort = data.sort || 1

      await this.repository.save(category)
    }
    catch (e) {
      throw new FailedException('更新商品分类', e.message, e.status)
    }
  }

  /**
   * 删除商品分类
   *
   * @param id number
   */
  async delete(id: number) {
    try {
      await this.repository.delete({ id })
    }
    catch (e) {
      throw new FailedException('删除商品分类', e.message)
    }
  }
}
