import type {
  IApiPaginationData,
  ISystemDepartmentPositionDict,
  ISystemDepartmentPositionInfo,
  ISystemDepartmentPositionList,
} from '@xiaoshop/shared'

import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FindOptionsWhere, Not, Repository } from 'typeorm'

import { toEventName } from '~/utils/transformers'
import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { SystemDepartmentService } from '@/system/organize/department/service'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'

import { SystemDepartmentPosition } from './entity'
import { GetSystemDepartmentPositionPagesRequest, SystemDepartmentPositionPayload } from './dto'
import { SystemDepartmentPositionCreateEvent, SystemDepartmentPositionDeleteEvent, SystemDepartmentPositionUpdateEvent } from './events'

@Injectable()
export class SystemDepartmentPositionService {
  constructor(
    @InjectRepository(SystemDepartmentPosition)
    private readonly repository: Repository<SystemDepartmentPosition>,

    @Inject(SystemDepartmentService)
    private readonly department: SystemDepartmentService,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取部门职位列表
   *
   * @param query 查询条件
   * @returns 部门职位列表
   * @throws {FailedException} 获取部门职位列表失败
   */
  async findPages(
    query: GetSystemDepartmentPositionPagesRequest,
  ): Promise<IApiPaginationData<ISystemDepartmentPositionList>> {
    try {
      const where: FindOptionsWhere<SystemDepartmentPosition> = {}

      if (query.departmentId)
        where.departmentId = query.departmentId

      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: {
          id: true,
          name: true,
          desc: true,
          sort: true,
          department: { id: true, name: true },
          updatedTime: true,
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

      return { page, pagesize, result, total }
    }
    catch (e) {
      throw new FailedException('获取部门职位列表', e.message)
    }
  }

  /**
   * 获取部门职位字典列表
   *
   * @param departmentId 所属部门 ID
   * @returns 部门职位字典列表
   * @throws {FailedException} 获取部门职位字典列表失败
   */
  async findDict(departmentId: number): Promise<ISystemDepartmentPositionDict[]> {
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
      throw new FailedException('获取部门职位字典列表', e.message)
    }
  }

  /**
   * 根据 ID 获取部门职位信息
   *
   * @param id 职位 ID
   * @returns 部门职位信息
   * @throws {NotFoundException} 部门职位信息不存在
   * @throws {FailedException} 获取部门职位信息失败
   */
  async findById(id: number): Promise<ISystemDepartmentPositionInfo> {
    try {
      const position = await this.repository.findOne({
        select: ['id', 'departmentId', 'name', 'desc', 'sort'],
        where: { id },
      })

      if (!position)
        throw new FailedException('部门职位信息')

      return position
    }
    catch (e) {
      throw new FailedException('获取部门职位信息', e.message)
    }
  }

  /**
   * 创建部门职位
   *
   * @param data 职位信息
   * @throws {NotFoundException} 所在部门不存在
   * @throws {ExistsException} 部门职位已存在
   * @throws {FailedException} 创建部门职位失败
   */
  async create(data: SystemDepartmentPositionPayload) {
    try {
      const department = await this.department.findById(data.departmentId)

      if (!department)
        throw new NotFoundException('所在部门不存在')

      const exists = await this.repository.existsBy({
        departmentId: data.departmentId,
        name: data.name.trim(),
      })

      if (exists)
        throw new ExistsException('部门职位信息')

      const position = new SystemDepartmentPosition()

      position.departmentId = data.departmentId
      position.name = data.name.trim()
      position.desc = data.desc || ''
      position.sort = data.sort || 1

      const created = await this.repository.save(position)

      this.event.emit(
        toEventName(SystemDepartmentPositionCreateEvent.name),
        new SystemDepartmentPositionCreateEvent(
          department.id,
          department.name,
          created.id,
          created.name,
        ),
      )
    }
    catch (e) {
      throw new FailedException('创建部门职位', e.message, e.status)
    }
  }

  /**
   * 更新部门职位
   *
   * @param id 职位 ID
   * @param data 职位信息
   * @throws {NotFoundException} 部门职位信息不存在
   * @throws {NotFoundException} 所在部门不存在
   * @throws {ExistsException} 部门职位已存在
   * @throws {FailedException} 更新部门职位失败
   */
  async update(id: number, data: SystemDepartmentPositionPayload) {
    try {
      const position = await this.repository.findOne({
        select: ['id', 'departmentId', 'name', 'desc', 'sort'],
        where: { id },
      })

      if (!position)
        throw new NotFoundException('部门职位信息')

      const department = await this.department.findById(data.departmentId)

      if (!department)
        throw new NotFoundException('所在部门不存在')

      const exists = await this.repository.existsBy({
        id: Not(position.id),
        departmentId: data.departmentId,
        name: data.name.trim(),
      })

      if (exists)
        throw new ExistsException('部门职位信息')

      if (position.departmentId !== data.departmentId)
        position.departmentId = data.departmentId

      if (position.name !== data.name.trim())
        position.name = data.name.trim()

      if (position.desc !== data.desc)
        position.desc = data.desc

      if (position.sort !== data.sort)
        position.sort = data.sort || 1

      await this.repository.save(position)

      this.event.emit(
        toEventName(SystemDepartmentPositionUpdateEvent.name),
        new SystemDepartmentPositionUpdateEvent(
          department.id,
          department.name,
          position.id,
          position.name,
        ),
      )
    }
    catch (e) {
      throw new FailedException('更新部门职位', e.message, e.status)
    }
  }

  /**
   * 删除部门职位
   *
   * @param id 职位 ID
   * @throws {FailedException} 删除部门职位失败
   */
  async delete(id: number) {
    try {
      const position = await this.repository.findOne({
        select: ['id', 'name', 'department'],
        where: { id },
        relations: ['department'],
      })

      if (position) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(SystemDepartmentPositionDeleteEvent.name),
          new SystemDepartmentPositionDeleteEvent(
            position.department.id,
            position.department.name,
            position.id,
            position.name,
          ),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除部门职位', e.message)
    }
  }
}
