import type { IGoodsTag, IGoodsTagDict, IGoodsTagListItem } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GoodsTag } from '@/goods/tag/entity'
import { GoodsTagPayload } from '@/goods/tag/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'
import { StaffLogService } from '@/staff/log/service'

@Injectable()
export class GoodsTagService {
  constructor(
    @InjectRepository(GoodsTag)
    private readonly repository: Repository<GoodsTag>,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {}

  /**
   * 获取商品标签列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsTagListItem[]>
   * @see {@link IGoodsTagListItem}
   */
  async findList(): Promise<IGoodsTagListItem[]> {
    try {
      return await this.repository.find({
        select: {
          id: true,
          name: true,
          sort: true,
          updatedTime: true,
        },
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品标签列表', e.message)
    }
  }

  /**
   * 获取商品标签字典列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsTagDict[]>
   * @see {@link IGoodsTagDict}
   */
  async findDictList(): Promise<IGoodsTagDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品标签字典列表', e.message)
    }
  }

  /**
   * 获取商品标签详情
   *
   * @param id number
   * @throws NotFoundException
   * @throws FailedException
   * @returns Promise<IGoodsTag>
   * @see {@link IGoodsTag}
   */
  async findDetail(id: number): Promise<IGoodsTag> {
    try {
      const detail = await this.repository.findOne({
        where: { id },
      })

      if (!detail)
        throw new NotFoundException('商品标签')

      return detail
    }
    catch (e) {
      throw new FailedException('获取商品标签详情', e.message, e.status)
    }
  }

  /**
   * 创建商品标签
   *
   * @param data GoodsTagPayload
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsTagPayload}
   */
  async create(data: GoodsTagPayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品标签 [${data.name}] `)

      const goodsTag = new GoodsTag()

      goodsTag.name = data.name
      goodsTag.sort = data.sort

      await this.repository.save(goodsTag)
      await this.log.write('商品管理', `创建商品标签「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('创建商品标签', e.message, e.status)
    }
  }

  /**
   * 更新商品标签
   *
   * @param id number
   * @param data GoodsTagPayload
   * @throws NotFoundException
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsTagPayload}
   */
  async update(id: number, data: GoodsTagPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`商品标签 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品标签 [${data.name}] `)

      const goodsTag = new GoodsTag()

      goodsTag.id = id
      goodsTag.name = data.name
      goodsTag.sort = data.sort

      await this.repository.save(goodsTag)
      await this.log.write('商品管理', `更新商品标签「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('更新商品标签', e.message, e.status)
    }
  }

  /**
   * 删除商品标签
   *
   * @param id number
   */
  async delete(id: number) {
    try {
      const tag = await this.repository.findOneBy({ id })

      if (tag) {
        await this.repository.delete({ id })
        await this.log.write('商品管理', `删除商品标签「${tag.name}」`)
      }
    }
    catch (e) {
      throw new FailedException('删除商品标签', e.message)
    }
  }
}
