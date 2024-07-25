import type { IApiPaginationData, IStaffRole, IStaffRoleDict } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from '@/staffs/role/entity'
import { GetRolePagesRequest, RolePayload } from '@/staffs/role/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'
import { useQueryPagination } from '~/hooks/pagination'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  /**
   * 获取员工角色分页列表
   *
   * @param query GetRolePagesRequest
   * @throws FailedException
   * @returns Promise<IApiPaginationData<IStaffRole>>
   * @see {@link IStaffRole}
   */
  async findPages(query: GetRolePagesRequest): Promise<IApiPaginationData<IStaffRole>> {
    try {
      return await useQueryPagination<IStaffRole>(
        this.repository.createQueryBuilder('entity'),
        query.page || 1,
        query.pagesize || 10,
      )
    }
    catch (e) {
      throw new FailedException('获取员工角色列表', e.message)
    }
  }

  /**
   * 获取员工角色列表
   *
   * @throws FailedException
   * @returns Promise<IStaffRoleDict[]>
   * @see {@link IStaffRoleDict}
   */
  async findList(): Promise<IStaffRoleDict[]> {
    try {
      return await this.repository.find({
        select: ['id', 'name'],
      })
    }
    catch (e) {
      throw new FailedException('获取员工角色列表', e.message)
    }
  }

  /**
   * 获取员工角色详情
   *
   * @param id number
   * @throws FailedException
   * @throws NotFoundException
   * @returns Promise<IStaffRole>
   * @see {@link IStaffRole}
   */
  async findDetail(id: number): Promise<IStaffRole> {
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
   * @param data RolePayload
   * @throws FailedException
   * @throws ExistsException
   * @see {@link RolePayload}
   */
  async create(data: RolePayload) {
    try {
      const exists = await this.repository.existsBy({
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`员工角色 [${data.name}] `)

      await this.repository.save(data)
    }
    catch (e) {
      throw new FailedException('创建员工角色', e.message, e.status)
    }
  }

  /**
   * 更新员工角色
   *
   * @param id number
   * @param data RolePayload
   * @throws FailedException
   * @throws NotFoundException
   * @throws ExistsException
   * @see {@link RolePayload}
   */
  async update(id: number, data: RolePayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`员工角色 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`员工角色 [${data.name}] `)

      await this.repository.update({ id }, data)
    }
    catch (e) {
      throw new FailedException('更新员工角色', e.message, e.status)
    }
  }

  /**
   * 删除员工角色
   *
   * @param id number
   * @throws FailedException
   */
  async delete(id: number) {
    try {
      await this.repository.delete({ id })
    }
    catch (e) {
      throw new FailedException('删除员工角色', e.message)
    }
  }
}
