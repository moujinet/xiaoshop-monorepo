import type {
  ISystemDepartmentInfo,
  ISystemDepartmentNestedDict,
  ISystemDepartmentNestedList,
  ISystemDepartmentRootDict,
} from '@xiaoshop/shared'

import { Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { toEventName, toNestedList } from '~/utils/transformers'
import { ExistsException, FailedException } from '~/common/exceptions'
import { SystemDepartmentEntity } from '@/system/organization/department/entity'

import { SystemDepartmentPayload } from './dto/payload'
import { SystemDepartmentCreateEvent, SystemDepartmentDeleteEvent, SystemDepartmentUpdateEvent } from './events'

@Injectable()
export class SystemDepartmentAdminService {
  constructor(
    @InjectRepository(SystemDepartmentEntity)
    private readonly repository: Repository<SystemDepartmentEntity>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取部门列表
   *
   * @returns 部门列表
   * @throws {FailedException} 获取部门列表失败
   */
  async findNestedList(): Promise<ISystemDepartmentNestedList[]> {
    try {
      const list = await this.repository.find({
        select: ['id', 'parentId', 'name', 'desc', 'sort', 'updatedTime'],
        order: {
          parentId: 'ASC',
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })

      return toNestedList<ISystemDepartmentNestedList>(list)
    }
    catch (e) {
      throw new FailedException('获取部门列表', e.message, e.status)
    }
  }

  /**
   * 获取部门字典列表
   *
   * @returns 部门字典列表
   * @throws {FailedException} 获取部门字典列表失败
   */
  async findNestedDictList(): Promise<ISystemDepartmentNestedDict[]> {
    try {
      const list = await this.repository.find({
        select: ['id', 'parentId', 'name'],
        order: {
          parentId: 'ASC',
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })

      return toNestedList<ISystemDepartmentNestedDict>(list)
    }
    catch (e) {
      throw new FailedException('获取部门字典列表', e.message)
    }
  }

  /**
   * 获取根部门列表
   *
   * @returns 根部门列表
   * @throws {FailedException} 获取根部门列表失败
   */
  async findRootList(): Promise<ISystemDepartmentRootDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
        where: { parentId: 0 },
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取根部门列表', e.message)
    }
  }

  /**
   * 根据 ID 获取部门信息
   *
   * @param id 部门 ID
   * @returns 部门信息
   * @throws {NotFoundException} 部门信息不存在
   * @throws {FailedException} 获取部门信息失败
   */
  async findById(id: number): Promise<ISystemDepartmentInfo> {
    try {
      const department = await this.repository.findOne({
        select: ['id', 'parentId', 'name', 'desc', 'sort'],
        where: { id },
      })

      if (!department)
        throw new FailedException('部门信息')

      return department
    }
    catch (e) {
      throw new FailedException('获取部门信息', e.message)
    }
  }

  /**
   * 创建部门
   *
   * @param data 部门信息
   * @throws {NotFoundException} 上级部门不存在
   * @throws {ExistsException} 部门已存在
   * @throws {FailedException} 创建部门失败
   */
  async create(data: SystemDepartmentPayload) {
    try {
      if (data.parentId && !await this.repository.existsBy({ id: data.parentId }))
        throw new NotFoundException('上级部门')

      const exists = await this.repository.existsBy({
        parentId: data.parentId || 0,
        name: data.name.trim(),
      })

      if (exists)
        throw new ExistsException('部门信息')

      const department = new SystemDepartmentEntity()

      department.parentId = data.parentId || 0
      department.name = data.name.trim()
      department.desc = data.desc || ''
      department.sort = data.sort || 1

      const created = await this.repository.save(department)

      this.event.emit(
        toEventName(SystemDepartmentCreateEvent.name),
        new SystemDepartmentCreateEvent(created.id, created.name),
      )
    }
    catch (e) {
      throw new FailedException('创建部门', e.message, e.status)
    }
  }

  /**
   * 更新部门
   *
   * @param id 部门 ID
   * @param data 部门信息
   * @throws {NotFoundException} 部门信息不存在
   * @throws {NotFoundException} 上级部门不存在
   * @throws {ExistsException} 部门已存在
   * @throws {FailedException} 更新部门失败
   */
  async update(id: number, data: SystemDepartmentPayload) {
    try {
      const founded = await this.repository.findOne({
        select: ['id', 'parentId', 'name', 'desc', 'sort'],
        where: { id },
      })

      if (!founded)
        throw new NotFoundException('部门信息')

      if (data.parentId && !await this.repository.existsBy({ id: data.parentId }))
        throw new NotFoundException('上级部门')

      const exists = await this.repository.existsBy({
        id: Not(id),
        parentId: data.parentId || 0,
        name: data.name.trim(),
      })

      if (exists)
        throw new ExistsException('部门信息')

      founded.name = data.name.trim()

      if (data.parentId !== undefined && founded.parentId !== data.parentId)
        founded.parentId = data.parentId

      if (data.desc !== undefined)
        founded.desc = data.desc

      if (data.sort !== undefined)
        founded.sort = data.sort

      const updated = await this.repository.save(founded)

      this.event.emit(
        toEventName(SystemDepartmentUpdateEvent.name),
        new SystemDepartmentUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('更新部门', e.message, e.status)
    }
  }

  /**
   * 删除部门
   *
   * @param id 部门 ID
   * @throws {FailedException} 删除部门失败
   */
  async delete(id: number) {
    try {
      const founded = await this.repository.findOne({
        select: ['id', 'name'],
        where: { id },
      })

      if (founded) {
        await this.repository.delete(id)

        this.event.emit(
          toEventName(SystemDepartmentDeleteEvent.name),
          new SystemDepartmentDeleteEvent(founded.id, founded.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除部门', e.message)
    }
  }
}
