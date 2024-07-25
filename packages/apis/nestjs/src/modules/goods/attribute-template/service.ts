import type { IGoodsAttributeTemplate, IGoodsAttributeTemplateDict, IGoodsAttributeTemplateListItem } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GoodsAttributeTemplate } from '@/goods/attribute-template/entity'
import { GoodsAttributeTemplatePayload } from '@/goods/attribute-template/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class GoodsAttributeTemplateService {
  constructor(
    @InjectRepository(GoodsAttributeTemplate)
    private readonly repository: Repository<GoodsAttributeTemplate>,
  ) {}

  /**
   * 获取商品参数模板列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsAttributeTemplateListItem[]>
   * @see {@link IGoodsAttributeTemplateListItem}
   */
  async findList(): Promise<IGoodsAttributeTemplateListItem[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name', 'desc', 'updatedTime'],
      })
    }
    catch (e) {
      throw new FailedException('获取商品参数模板列表', e.message)
    }
  }

  /**
   * 获取商品参数模板字典列表
   *
   * @throws FailedException
   * @returns Promise<IGoodsAttributeTemplateDict[]>
   * @see {@link IGoodsAttributeTemplateDict}
   */
  async findDictList(): Promise<IGoodsAttributeTemplateDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
      })
    }
    catch (e) {
      throw new FailedException('获取商品参数模板字典列表', e.message)
    }
  }

  /**
   * 获取商品参数模板详情
   *
   * @param id number
   * @throws NotFoundException
   * @throws FailedException
   * @returns Promise<IGoodsAttributeTemplate>
   * @see {@link IGoodsAttributeTemplate}
   */
  async findDetail(id: number): Promise<IGoodsAttributeTemplate> {
    try {
      const detail = await this.repository.findOne({
        where: { id },
      })

      if (!detail)
        throw new NotFoundException('商品参数模板')

      return detail
    }
    catch (e) {
      throw new FailedException('获取商品参数模板详情', e.message, e.status)
    }
  }

  /**
   * 创建商品参数模板信息
   *
   * @param data GoodsAttributeTemplatePayload
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsAttributeTemplatePayload}
   */
  async create(data: GoodsAttributeTemplatePayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品参数模板 [${data.name}] `)

      const template = new GoodsAttributeTemplate()

      template.name = data.name
      template.desc = data.desc || ''
      template.options = []

      await this.repository.save(template)
    }
    catch (e) {
      throw new FailedException('创建商品参数模板', e.message, e.status)
    }
  }

  /**
   * 创建商品参数模板信息
   *
   * @param id number
   * @param data GoodsAttributeTemplatePayload
   * @throws ExistsException
   * @throws FailedException
   * @see {@link GoodsAttributeTemplatePayload}
   */
  async update(id: number, data: GoodsAttributeTemplatePayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`商品参数模板 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`商品参数模板 [${data.name}] `)

      const template = new GoodsAttributeTemplate()

      template.id = id
      template.name = data.name
      template.desc = data.desc || ''
      template.options = data.options || []

      await this.repository.save(template)
    }
    catch (e) {
      throw new FailedException('更新商品参数模板', e.message, e.status)
    }
  }

  /**
   * 删除商品参数模板
   *
   * @param id number
   */
  async delete(id: number) {
    try {
      await this.repository.delete({ id })
    }
    catch (e) {
      throw new FailedException('删除商品参数模板', e.message)
    }
  }
}
