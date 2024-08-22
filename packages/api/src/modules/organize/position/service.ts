import type {
  IApiPaginationData,
  IOrganizePosition,
  IOrganizePositionDict,
} from '@xiaoshop/shared'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FindOptionsWhere, Like, Not, Repository } from 'typeorm'
import { OrganizePosition } from '@/organize/position/entity'
import { OrganizeDepartmentService } from '@/organize/department/service'
import {
  GetOrganizePositionPagesRequest,
  OrganizePositionPayload,
} from '@/organize/position/dto'
import {
  OrganizePositionCreatedEvent,
  OrganizePositionDeletedEvent,
  OrganizePositionUpdatedEvent,
} from '@/organize/position/events'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class OrganizePositionService {
  constructor(
    @InjectRepository(OrganizePosition)
    private readonly repository: Repository<OrganizePosition>,

    @Inject(OrganizeDepartmentService)
    private readonly department: OrganizeDepartmentService,

    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取职位列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IOrganizePosition>>
   * @throws {FailedException} 获取职位列表失败
   */
  async findPages(
    query: GetOrganizePositionPagesRequest,
  ): Promise<IApiPaginationData<IOrganizePosition>> {
    try {
      const where: FindOptionsWhere<OrganizePosition> = {}

      if (query.departmentId)
        where.departmentId = query.departmentId

      if (query.name)
        where.name = Like(`%${query.name}%`)

      const page = query.page || 1
      const pagesize = query.pagesize || 10
      const [result, total] = await this.repository.findAndCount({
        select: {
          department: { id: true, name: true },
        },
        where,
        relations: ['department'],
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })

      return { result, page, pagesize, total }
    }
    catch (e) {
      throw new FailedException('获取职位列表', e.message)
    }
  }

  /**
   * 获取职位字典列表
   *
   * @param departmentId 所属部门 ID
   * @returns Promise<IOrganizePositionDict[]>
   * @throws {FailedException} 获取职位字典列表失败
   */
  async findDictListByDepartmentId(departmentId: number): Promise<IOrganizePositionDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        where: { departmentId },
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取职位字典列表', e.message)
    }
  }

  /**
   * 获取职位详情
   *
   * @param id 职位 ID
   * @returns Promise<IOrganizePosition>
   * @throws {FailedException} 获取职位详情失败
   * @throws {NotFoundException} 职位不存在
   */
  async findById(id: number): Promise<IOrganizePosition> {
    try {
      const detail = await this.repository.findOne({
        where: { id },
        relations: ['department'],
      })

      if (!detail)
        throw new NotFoundException('职位')

      return detail
    }
    catch (e) {
      throw new FailedException('获取职位详情', e.message, e.status)
    }
  }

  /**
   * 创建职位
   *
   * @param data 职位信息
   * @throws {FailedException} 创建职位失败
   * @throws {NotFoundException} 部门不存在
   * @throws {ExistsException} 职位已存在
   * @event OrganizePositionCreatedEvent
   */
  async create(data: OrganizePositionPayload) {
    try {
      const exists = await this.repository.existsBy({
        departmentId: data.departmentId,
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`职位 ${data.name} `)

      if (!await this.department.isExists(data.departmentId))
        throw new NotFoundException('部门不存在')

      const position = await this.repository.save(data)

      this.event.emit(
        toEventName(OrganizePositionCreatedEvent.name),
        new OrganizePositionCreatedEvent(position.id, position.name),
      )
    }
    catch (e) {
      throw new FailedException('创建职位失败', e.message, e.status)
    }
  }

  /**
   * 更新职位
   *
   * @param id 职位 ID
   * @param data 职位信息
   * @throws {FailedException} 更新职位失败
   * @throws {NotFoundException} 职位不存在
   * @throws {NotFoundException} 部门不存在
   * @throws {ExistsException} 职位已存在
   * @event OrganizePositionUpdatedEvent
   */
  async update(id: number, data: OrganizePositionPayload) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (!founded)
        throw new NotFoundException(`职位 ${data.name} `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        departmentId: data.departmentId,
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`职位 ${data.name} `)

      if (!await this.department.isExists(data.departmentId))
        throw new NotFoundException('部门不存在')

      await this.repository.update(id, data)

      this.event.emit(
        toEventName(OrganizePositionUpdatedEvent.name),
        new OrganizePositionUpdatedEvent(id, founded.name),
      )
    }
    catch (e) {
      throw new FailedException('更新职位失败', e.message, e.status)
    }
  }

  /**
   * 删除职位
   *
   * @param id 职位 ID
   * @throws {FailedException} 删除职位失败
   * @event OrganizePositionDeletedEvent
   */
  async delete(id: number) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (founded) {
        await this.repository.delete({ id })

        this.event.emit(
          toEventName(OrganizePositionDeletedEvent.name),
          new OrganizePositionDeletedEvent(id, founded.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除职位失败', e.message)
    }
  }

  /**
   * 职位是否存在
   *
   * @param id 职位 ID
   * @returns Promise<boolean>
   */
  async isExists(id: number): Promise<boolean> {
    return await this.repository.existsBy({ id })
  }
}
