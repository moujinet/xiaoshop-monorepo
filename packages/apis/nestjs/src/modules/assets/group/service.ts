import type { IAssetGroup, IAssetGroupRootItem } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AssetGroup } from '@/assets/group/entity'
import { AssetGroupPayload, GetAssetGroupListRequest } from '@/assets/group/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'
import { StaffLogService } from '@/staff/log/service'

@Injectable()
export class AssetGroupService {
  constructor(
    @InjectRepository(AssetGroup)
    private readonly repository: Repository<AssetGroup>,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {}

  /**
   * 获取素材分组列表
   *
   * @param query GetAssetGroupListRequest
   * @throws FailedException
   * @returns Promise<IAssetGroup[]>
   * @see {@link IAssetGroup}
   */
  async findList(query: GetAssetGroupListRequest): Promise<IAssetGroup[]> {
    try {
      return await this.repository.find({
        where: {
          type: query.type,
        },
        order: {
          id: 'ASC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取素材分组列表', e.message)
    }
  }

  /**
   * 获取素材分组根列表
   *
   * @param query GetAssetGroupListRequest
   * @throws FailedException
   * @returns Promise<IAssetGroupRootItem[]>
   * @see {@link IAssetGroupRootItem}
   */
  async findRootList(query: GetAssetGroupListRequest): Promise<IAssetGroupRootItem[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        where: {
          type: query.type,
          parentId: 0,
        },
        order: {
          id: 'ASC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取素材分组根列表', e.message)
    }
  }

  /**
   * 获取素材分组详情
   *
   * @param id number
   * @throws FailedException
   * @throws NotFoundException
   * @returns Promise<IAssetGroup>
   * @see {@link IAssetGroup}
   */
  async findDetail(id: number): Promise<IAssetGroup> {
    try {
      const detail = await this.repository.findOneBy({ id })

      if (!detail)
        throw new NotFoundException('素材分组')

      return detail
    }
    catch (e) {
      throw new FailedException('获取素材分组详情', e.message, e.status)
    }
  }

  /**
   * 创建素材分组
   *
   * @param data AssetGroupPayload
   * @throws FailedException
   * @throws ExistsException
   * @see {@link AssetGroupPayload}
   */
  async create(data: AssetGroupPayload) {
    try {
      const exists = await this.repository.existsBy({
        type: data.type,
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`素材分组 [${data.name}] `)

      await this.repository.save(data)
      await this.log.write('素材管理', `创建素材分组「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('创建素材分组', e.message, e.status)
    }
  }

  /**
   * 更新素材分组
   *
   * @param id number
   * @param data AssetGroupPayload
   * @throws FailedException
   * @throws NotFoundException
   * @throws ExistsException
   * @see {@link AssetGroupPayload}
   */
  async update(id: number, data: AssetGroupPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`素材分组 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        type: data.type,
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`素材分组 [${data.name}] `)

      await this.repository.update({ id }, data)
      await this.log.write('素材管理', `更新素材分组「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('更新素材分组', e.message, e.status)
    }
  }

  /**
   * 删除素材分组
   *
   * @param id number
   * @throws FailedException
   */
  async delete(id: number) {
    try {
      const group = await this.repository.findOneBy({ id })

      if (group) {
        await this.repository.delete({ id })
        await this.log.write('素材管理', `删除素材分组：${group.name}`)
      }
    }
    catch (e) {
      throw new FailedException('删除素材分组', e.message)
    }
  }
}
