import type { IApiPaginationData, IStaffAccountProfile } from '@xiaoshop/schema'
import * as bcrypt from 'bcrypt'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from '@/staffs/role/entity'
import { Account } from '@/staffs/account/entity'
import { Position } from '@/staffs/position/entity'
import { Department } from '@/staffs/department/entity'
import { GetAccountPagesRequest, RegisterAccountPayload, UpdateAccountPayload } from '@/staffs/account/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'
import { useQueryPagination } from '~/hooks/pagination'

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly repository: Repository<Account>,
  ) {}

  /**
   * 获取员工账号分页列表
   *
   * @param query GetAccountPagesRequest
   * @throws FailedException
   * @returns Promise<IApiPaginationData<IStaffAccountProfile>>
   * @see {@link IStaffAccountProfile}
   */
  async findPages(query: GetAccountPagesRequest): Promise<IApiPaginationData<IStaffAccountProfile>> {
    try {
      const entity = this.repository.createQueryBuilder('entity')

      entity.select([
        'entity.id',
        'entity.name',
        'entity.mobile',
        'entity.isAdmin',
        'entity.status',
        'entity.username',
        'entity.createdTime',
        'entity.lastLoginTime',
      ])

      entity.leftJoin('entity.roles', 'roles')
      entity.addSelect('roles.id')
      entity.addSelect('roles.name')
      entity.addSelect('roles.permissions')

      entity.leftJoin('entity.department', 'department')
      entity.addSelect('department.id')
      entity.addSelect('department.name')

      entity.leftJoin('entity.position', 'position')
      entity.addSelect('position.id')
      entity.addSelect('position.name')

      if (query.roleId && query.roleId > 0)
        entity.andWhere('roles.id = :roleId', { roleId: query.roleId })

      if (query.departmentId && query.departmentId > 0)
        entity.andWhere('department.id = :departmentId', { departmentId: query.departmentId })

      if (query.positionId && query.positionId > 0)
        entity.andWhere('position.id = :positionId', { positionId: query.positionId })

      if (query.name)
        entity.andWhere('entity.name LIKE :name', { name: `%${query.name}%` })

      if (query.mobile)
        entity.andWhere('entity.mobile LIKE :mobile', { mobile: `%${query.mobile}%` })

      if (query.status)
        entity.andWhere('entity.status = :status', { status: query.status })

      return await useQueryPagination<IStaffAccountProfile>(entity, query.page || 1, query.pagesize || 10)
    }
    catch (e) {
      throw new FailedException('获取员工账号列表', e.message)
    }
  }

  /**
   * 获取员工账号详情
   *
   * @param id number
   * @throws FailedException
   * @throws NotFoundException
   * @returns Promise<IStaffAccountProfile>
   * @see {@link IStaffAccountProfile}
   */
  async findDetail(id: number): Promise<IStaffAccountProfile> {
    try {
      const detail = await this.repository.findOne({
        select: {
          id: true,
          isAdmin: true,
          status: true,
          username: true,
          name: true,
          mobile: true,
          createdTime: true,
          lastLoginTime: true,
          roles: { id: true, name: true, permissions: true },
          position: { id: true, name: true },
          department: { id: true, name: true },
        },
        where: {
          id,
        },
        relations: [
          'roles',
          'position',
          'department',
        ],
      })

      if (!detail)
        throw new NotFoundException('员工账号')

      return detail
    }
    catch (e) {
      throw new FailedException('获取员工账号详情', e.message, e.status)
    }
  }

  /**
   * 创建员工账号
   *
   * @param data RegisterAccountPayload
   * @throws FailedException
   * @throws ExistsException
   * @see {@link RegisterAccountPayload}
   */
  async create(data: RegisterAccountPayload) {
    try {
      const existsName = await this.repository.existsBy({
        name: data.name,
      })

      if (existsName)
        throw new ExistsException(`员工姓名 [${data.name}] `)

      const existsUsername = await this.repository.existsBy({
        username: data.username,
      })

      if (existsUsername)
        throw new ExistsException(`员工账号 [${data.username}] `)

      const existsMobile = await this.repository.existsBy({
        mobile: data.mobile,
      })

      if (existsMobile)
        throw new ExistsException(`员工手机 [${data.mobile}] `)

      const account = new Account()

      account.username = data.username
      account.name = data.name
      account.mobile = data.mobile
      account.isAdmin = data.isAdmin
      account.status = data.status
      account.roles = []

      account.salt = await bcrypt.genSalt()
      account.password = await bcrypt.hash(data.password, account.salt)

      if (data.roleIds && data.roleIds.length > 0) {
        for (const roleId of data.roleIds) {
          const role = new Role()
          role.id = roleId
          account.roles.push(role)
        }
      }

      if (data.positionId) {
        const position = new Position()
        position.id = data.positionId
        account.position = position
      }

      if (data.departmentId) {
        const department = new Department()
        department.id = data.departmentId
        account.department = department
      }

      await this.repository.save(account)
    }
    catch (e) {
      throw new FailedException('创建员工账号', e.message, e.status)
    }
  }

  /**
   * 更新员工账号
   *
   * @param id number
   * @param data UpdateAccountPayload
   * @throws FailedException
   * @throws NotFoundException
   * @throws ExistsException
   * @see {@link UpdateAccountPayload}
   */
  async update(id: number, data: UpdateAccountPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`员工账号 [${data.name}] `)

      const existsName = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (existsName)
        throw new ExistsException(`员工姓名 [${data.name}] `)

      const existsUsername = await this.repository.existsBy({
        id: Not(id),
        username: data.username,
      })

      if (existsUsername)
        throw new ExistsException(`员工账号 [${data.username}] `)

      const existsMobile = await this.repository.existsBy({
        id: Not(id),
        mobile: data.mobile,
      })

      if (existsMobile)
        throw new ExistsException(`员工手机 [${data.mobile}] `)

      const account = new Account()

      account.id = id
      account.username = data.username
      account.name = data.name
      account.mobile = data.mobile
      account.isAdmin = data.isAdmin
      account.status = data.status
      account.roles = []

      if (data.password) {
        account.salt = await bcrypt.genSalt()
        account.password = await bcrypt.hash(data.password, account.salt)
      }

      if (data.roleIds && data.roleIds.length > 0) {
        for (const roleId of data.roleIds) {
          const role = new Role()
          role.id = roleId
          account.roles.push(role)
        }
      }

      if (data.positionId) {
        const position = new Position()
        position.id = data.positionId
        account.position = position
      }

      if (data.departmentId) {
        const department = new Department()
        department.id = data.departmentId
        account.department = department
      }

      await this.repository.save(account)
    }
    catch (e) {
      throw new FailedException('更新员工账号', e.message, e.status)
    }
  }

  /**
   * 删除员工账号
   *
   * @param id number
   * @throws FailedException
   */
  async delete(id: number) {
    try {
      await this.repository.delete({ id })
    }
    catch (e) {
      throw new FailedException('删除员工账号', e.message)
    }
  }
}
