import type { IApiPaginationData, IStaffRole, IStaffRoleDict } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StaffRole } from '@/staff/role/entity'
import { StaffLogService } from '@/staff/log/service'
import { GetRolePagesRequest, RolePayload } from '@/staff/role/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'
import { useQueryPagination } from '~/hooks/pagination'

@Injectable()
export class StaffRoleService {
  constructor(
    @InjectRepository(StaffRole)
    private readonly repository: Repository<StaffRole>,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,
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
        this.repository.createQueryBuilder('entity')
          .orderBy('entity.sort', 'ASC')
          .addOrderBy('entity.updatedTime', 'DESC'),
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
      await this.log.write('权限管理', `创建角色「${data.name}」`)
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
      await this.log.write('权限管理', `更新角色「${data.name}」`)
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
      const role = await this.repository.findOneBy({ id })

      if (role) {
        await this.repository.delete({ id })
        await this.log.write('权限管理', `删除角色「${role.name}」`)
      }
    }
    catch (e) {
      throw new FailedException('删除员工角色', e.message)
    }
  }
}
