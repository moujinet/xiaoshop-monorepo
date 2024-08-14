import type { IGoodsBrand, IGoodsBrandDict, IGoodsBrandListItem } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GoodsBrand } from '@/goods/brand/entity'
import { GoodsBrandPayload } from '@/goods/brand/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'
import { StaffLogService } from '@/staff/log/service'

@Injectable()
export class GoodsBrandService {
  constructor(
    @InjectRepository(GoodsBrand)
    private readonly repository: Repository<GoodsBrand>,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {}

  /**
   * 获取商品品牌列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsBrandListItem[]>
   * @see {@link IGoodsBrandListItem}
   */
  async findList(): Promise<IGoodsBrandListItem[]> {
    try {
      return await this.repository.find({
        select: {
          id: true,
          name: true,
          desc: true,
          logo: true,
          updatedTime: true,
        },
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取商品品牌列表', e.message)
    }
  }

  /**
   * 获取商品品牌字典列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsBrandDict[]>
   * @see {@link IGoodsBrandDict}
   */
  async findDictList(): Promise<IGoodsBrandDict[]> {
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
      throw new FailedException('获取商品品牌字典列表', e.message)
    }
  }

  /**
   * 获取商品品牌详情
   *
   * @param id number
   * @throws NotFoundException
   * @throws FailedException
   * @returns Promise<IGoodsBrand>
   * @see {@link IGoodsBrand}
   */
  async findDetail(id: number): Promise<IGoodsBrand> {
    try {
      const detail = await this.repository.findOne({
        where: { id },
      })

      if (!detail)
        throw new NotFoundException('商品品牌')

      return detail
    }
    catch (e) {
      throw new FailedException('获取商品品牌详情', e.message, e.status)
    }
  }

  /**
   * 创建商品品牌
   *
   * @param data GoodsBrandPayload
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsBrandPayload}
   */
  async create(data: GoodsBrandPayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品品牌 [${data.name}] `)

      const brand = new GoodsBrand()

      brand.name = data.name
      brand.desc = data.desc || ''
      brand.logo = data.logo || ''
      brand.sort = data.sort || 1

      await this.repository.save(brand)
      await this.log.write('商品管理', `创建商品品牌「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('创建商品品牌', e.message, e.status)
    }
  }

  /**
   * 更新商品品牌
   *
   * @param id number
   * @param data GoodsBrandPayload
   * @throws NotFoundException
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsBrandPayload}
   */
  async update(id: number, data: GoodsBrandPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`商品品牌 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品品牌 [${data.name}] `)

      const brand = new GoodsBrand()

      brand.id = id
      brand.name = data.name
      brand.desc = data.desc || ''
      brand.logo = data.logo || ''
      brand.sort = data.sort || 1

      await this.repository.save(brand)
      await this.log.write('商品管理', `更新商品品牌「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('更新商品品牌', e.message, e.status)
    }
  }

  /**
   * 删除商品品牌
   *
   * @param id number
   */
  async delete(id: number) {
    try {
      const brand = await this.repository.findOneBy({ id })

      if (brand) {
        await this.repository.delete({ id })
        await this.log.write('商品管理', `删除商品品牌「${brand.name}」`)
      }
    }
    catch (e) {
      throw new FailedException('删除商品品牌', e.message)
    }
  }
}
