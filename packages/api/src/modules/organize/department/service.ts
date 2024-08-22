import type {
  IOrganizeDepartment,
  IOrganizeDepartmentDict,
  IOrganizeDepartmentDictTreeItem,
} from '@xiaoshop/shared'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { OrganizeDepartment } from '@/organize/department/entity'
import { OrganizeDepartmentPayload } from '@/organize/department/dto'
import {
  OrganizeDepartmentCreatedEvent,
  OrganizeDepartmentDeletedEvent,
  OrganizeDepartmentUpdatedEvent,
} from '@/organize/department/events'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class OrganizeDepartmentService {
  constructor(
    @InjectRepository(OrganizeDepartment)
    private readonly repository: Repository<OrganizeDepartment>,

    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取组织部门列表
   *
   * @returns Promise<IOrganizeDepartment[]>
   * @throws {FailedException} 获取组织部门列表失败
   * @see {@link IOrganizeDepartment}
   */
  async findList(): Promise<IOrganizeDepartment[]> {
    try {
      return await this.repository.find({
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取组织部门列表', e.message)
    }
  }

  /**
   * 获取组织部门根列表
   *
   * @returns Promise<IStaffDepartmentDict[]>
   * @throws {FailedException} 获取组织部门根列表失败
   * @see {@link IStaffDepartmentDict}
   */
  async findRootList(): Promise<IOrganizeDepartmentDict[]> {
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
      throw new FailedException('获取组织部门根列表', e.message)
    }
  }

  /**
   * 获取组织部门字典列表
   *
   * @returns Promise<IOrganizeDepartmentDictTreeItem[]>
   * @throws {FailedException} 获取组织部门字典列表失败
   * @see {@link IOrganizeDepartmentDictTreeItem}
   */
  async findDictList(): Promise<IOrganizeDepartmentDictTreeItem[]> {
    try {
      return await this.repository.find({
        select: ['id', 'parentId', 'name'],
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取组织部门字典列表', e.message)
    }
  }

  /**
   * 获取组织部门详情
   *
   * @param id 部门 ID
   * @returns Promise<IOrganizeDepartment>
   * @throws {FailedException} 获取组织部门详情失败
   * @throws {NotFoundException} 组织部门不存在
   * @see {@link IOrganizeDepartment}
   */
  async findById(id: number): Promise<IOrganizeDepartment> {
    try {
      const detail = await this.repository.findOneBy({ id })

      if (!detail)
        throw new NotFoundException('组织部门')

      return detail
    }
    catch (e) {
      throw new FailedException('获取组织部门详情', e.message, e.status)
    }
  }

  /**
   * 创建组织部门
   *
   * @param data 部门信息
   * @throws {FailedException} 创建组织部门失败
   * @throws {ExistsException} 组织部门已存在
   * @event OrganizeDepartmentCreatedEvent
   */
  async create(data: OrganizeDepartmentPayload) {
    try {
      const exists = await this.repository.existsBy({
        parentId: data.parentId || 0,
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`组织部门 [${data.name}] `)

      const department = await this.repository.save(data)

      this.event.emit(
        toEventName(OrganizeDepartmentCreatedEvent.name),
        new OrganizeDepartmentCreatedEvent(department.id, department.name),
      )
    }
    catch (e) {
      throw new FailedException('创建组织部门', e.message, e.status)
    }
  }

  /**
   * 更新组织部门
   *
   * @param id 部门 ID
   * @param data 部门信息
   * @throws {FailedException} 更新组织部门失败
   * @throws {NotFoundException} 组织部门不存在
   * @throws {ExistsException} 组织部门已存在
   * @event OrganizeDepartmentUpdatedEvent
   */
  async update(id: number, data: OrganizeDepartmentPayload) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (!founded)
        throw new NotFoundException(`组织部门 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        parentId: data.parentId || 0,
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`组织部门 [${data.name}] `)

      await this.repository.update({ id }, data)

      this.event.emit(
        toEventName(OrganizeDepartmentUpdatedEvent.name),
        new OrganizeDepartmentUpdatedEvent(id, founded.name),
      )
    }
    catch (e) {
      throw new FailedException('更新组织部门', e.message, e.status)
    }
  }

  /**
   * 删除组织部门
   *
   * @param id number
   * @throws {FailedException} 删除组织部门失败
   * @event OrganizeDepartmentDeletedEvent
   */
  async delete(id: number) {
    try {
      const department = await this.repository.findOneBy({ id })

      if (department) {
        await this.repository.delete({ id })

        this.event.emit(
          toEventName(OrganizeDepartmentDeletedEvent.name),
          new OrganizeDepartmentDeletedEvent(id, department.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除组织部门', e.message)
    }
  }

  /**
   * 部门是否存在
   *
   * @param id 部门 ID
   * @returns Promise<boolean>
   */
  async isExists(id: number): Promise<boolean> {
    return this.repository.existsBy({ id })
  }
}
