import type {
  IApiPaginationData,
  IAuthRole,
  IAuthRoleDict,
  IAuthRoleListItem,
} from '@xiaoshop/shared'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { AuthRole } from '@/auth/role/entity'
import {
  AuthRoleCreatedEvent,
  AuthRoleDeletedEvent,
  AuthRoleUpdatedEvent,
} from '@/auth/role/events'
import {
  AuthRolePayload,
  GetAuthRolePagesRequest,
} from '@/auth/role/dto'
import {
  ExistsException,
  FailedException,
  NotFoundException,
} from '~/common/exceptions'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class AuthRoleService {
  constructor(
    @InjectRepository(AuthRole)
    private readonly repository: Repository<AuthRole>,

    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取员工角色分页列表
   *
   * @param query 查询条件
   * @throws {FailedException} 获取员工角色列表失败
   * @returns Promise<IApiPaginationData<IAuthRoleListItem>>
   * @see {@link IAuthRoleListItem}
   */
  async findPages(
    query: GetAuthRolePagesRequest,
  ): Promise<IApiPaginationData<IAuthRoleListItem>> {
    try {
      const page = query.page || 1
      const pagesize = query.pagesize || 10
      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'name', 'desc', 'sort', 'updatedTime'],
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          sort: 'ASC',
          updatedTime: 'DESC',
        },
      })

      return { page, pagesize, total, result }
    }
    catch (e) {
      throw new FailedException('获取员工角色列表', e.message)
    }
  }

  /**
   * 获取员工角色列表
   *
   * @throws {FailedException} 获取员工角色列表失败
   * @returns Promise<IAuthRoleDict[]>
   * @see {@link IAuthRoleDict}
   */
  async findDictList(): Promise<IAuthRoleDict[]> {
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
      throw new FailedException('获取员工角色列表', e.message)
    }
  }

  /**
   * 获取员工角色详情
   *
   * @param id 角色 ID
   * @throws {FailedException} 获取员工角色详情失败
   * @throws {NotFoundException} 员工角色不存在
   * @returns Promise<IAuthRole>
   * @see {@link IAuthRole}
   */
  async findById(id: number): Promise<IAuthRole> {
    try {
      const detail = await this.repository.findOneBy({ id })

      if (!detail)
        throw new NotFoundException('员工角色')

      return detail
    }
    catch (e) {
      throw new FailedException('获取员工角色详情', e.message, e.status)
    }
  }

  /**
   * 创建员工角色
   *
   * @param data 角色信息
   * @throws {FailedException} 创建员工角色失败
   * @throws {ExistsException} 员工角色已存在
   * @event AuthRoleCreatedEvent
   */
  async create(data: AuthRolePayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`员工角色 ${data.name} `)

      const role = await this.repository.save(data)

      this.event.emit(
        toEventName(AuthRoleCreatedEvent.name),
        new AuthRoleCreatedEvent(role.id, role.name),
      )
    }
    catch (e) {
      throw new FailedException('创建员工角色', e.message, e.status)
    }
  }

  /**
   * 更新员工角色
   *
   * @param id 角色 ID
   * @param data 角色信息
   * @throws {FailedException} 更新员工角色失败
   * @throws {NotFoundException} 员工角色不存在
   * @throws {ExistsException} 员工角色已存在
   * @event AuthRoleUpdatedEvent
   */
  async update(id: number, data: AuthRolePayload) {
    try {
      const founded = await this.repository.findOneBy({ id })

      if (!founded)
        throw new NotFoundException(`员工角色 ${data.name} `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`员工角色 ${data.name} `)

      await this.repository.update({ id }, data)

      this.event.emit(
        toEventName(AuthRoleUpdatedEvent.name),
        new AuthRoleUpdatedEvent(id, founded.name),
      )
    }
    catch (e) {
      throw new FailedException('更新员工角色', e.message, e.status)
    }
  }

  /**
   * 删除员工角色
   *
   * @param id 角色 ID
   * @throws {FailedException} 删除员工角色失败
   * @event AuthRoleDeletedEvent
   */
  async delete(id: number) {
    try {
      const role = await this.repository.findOneBy({ id })

      if (role) {
        await this.repository.delete({ id })

        this.event.emit(
          toEventName(AuthRoleDeletedEvent.name),
          new AuthRoleDeletedEvent(id, role.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除员工角色', e.message)
    }
  }

  /**
   * 检查员工角色是否存在
   *
   * @param id 角色 ID
   * @returns Promise<boolean>
   */
  async isExists(id: number): Promise<boolean> {
    return await this.repository.existsBy({ id })
  }
}
