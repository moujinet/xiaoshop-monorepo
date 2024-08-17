import type { IStaffDepartment, IStaffDepartmentDict } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StaffDepartment } from '@/staff/department/entity'
import { DepartmentPayload } from '@/staff/department/dto'
import { StaffLogService } from '@/staff/log/service'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class StaffDepartmentService {
  constructor(
    @InjectRepository(StaffDepartment)
    private readonly repository: Repository<StaffDepartment>,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {}

  /**
   * 获取组织部门列表
   *
   * @throws FailedException
   * @returns Promise<IStaffDepartment[]>
   * @see {@link IStaffDepartment}
   */
  async findList(): Promise<IStaffDepartment[]> {
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
   * @throws FailedException
   * @returns Promise<IStaffDepartmentDict[]>
   * @see {@link IStaffDepartmentDict}
   */
  async findRootList(): Promise<IStaffDepartmentDict[]> {
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
   * 获取组织部门详情
   *
   * @param id number
   * @throws FailedException
   * @throws NotFoundException
   * @returns Promise<IStaffDepartment>
   * @see {@link IStaffDepartment}
   */
  async findDetail(id: number): Promise<IStaffDepartment> {
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
   * @param data DepartmentPayload
   * @throws FailedException
   * @throws ExistsException
   * @see {@link DepartmentPayload}
   */
  async create(data: DepartmentPayload) {
    try {
      const exists = await this.repository.existsBy({
        parentId: data.parentId,
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`组织部门 [${data.name}] `)

      await this.repository.save(data)
      await this.log.write('权限管理', `创建部门「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('创建组织部门', e.message, e.status)
    }
  }

  /**
   * 更新组织部门
   *
   * @param id number
   * @param data DepartmentPayload
   * @throws FailedException
   * @throws NotFoundException
   * @throws ExistsException
   * @see {@link DepartmentPayload}
   */
  async update(id: number, data: DepartmentPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`组织部门 [${data.name}] `)

      const exists = await this.repository.existsBy({
        id: Not(id),
        parentId: data.parentId,
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`组织部门 [${data.name}] `)

      await this.repository.update({ id }, data)
      await this.log.write('权限管理', `更新部门「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('更新组织部门', e.message, e.status)
    }
  }

  /**
   * 删除组织部门
   *
   * @param id number
   * @throws FailedException
   */
  async delete(id: number) {
    try {
      const department = await this.repository.findOneBy({ id })

      if (department) {
        await this.repository.delete({ id })
        await this.log.write('权限管理', `删除部门「${department.name}」`)
      }
    }
    catch (e) {
      throw new FailedException('删除组织部门', e.message)
    }
  }
}
