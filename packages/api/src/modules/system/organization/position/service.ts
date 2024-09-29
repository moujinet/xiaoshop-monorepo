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
import { SystemDepartmentService } from '@/system/organization/department/service'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'

import { SystemPositionEntity } from './entity'
import { SystemPositionPayload } from './dto/payload'
import { GetSystemPositionPagesRequest } from './dto/request'
import {
  SystemPositionCreateEvent,
  SystemPositionDeleteEvent,
  SystemPositionUpdateEvent,
} from './events'

@Injectable()
export class SystemPositionService {
  constructor(
    @InjectRepository(SystemPositionEntity)
    private readonly repository: Repository<SystemPositionEntity>,

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
    query: GetSystemPositionPagesRequest,
  ): Promise<IApiPaginationData<ISystemDepartmentPositionList>> {
    try {
      const where: FindOptionsWhere<SystemPositionEntity> = {}

      if (query.departmentId)
        where.departmentId = query.departmentId

      const {
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [list, total] = await this.repository.findAndCount({
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

      return { page, pagesize, list, total }
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
  async create(data: SystemPositionPayload) {
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

      const position = new SystemPositionEntity()

      position.departmentId = data.departmentId
      position.name = data.name.trim()
      position.desc = data.desc || ''
      position.sort = data.sort || 1

      const created = await this.repository.save(position)

      this.event.emit(
        toEventName(SystemPositionCreateEvent.name),
        new SystemPositionCreateEvent(
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
  async update(id: number, data: SystemPositionPayload) {
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
        toEventName(SystemPositionUpdateEvent.name),
        new SystemPositionUpdateEvent(
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
          toEventName(SystemPositionDeleteEvent.name),
          new SystemPositionDeleteEvent(
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
