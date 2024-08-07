import type { IStaffDepartment, IStaffDepartmentDict } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Department } from '@/staffs/department/entity'
import { DepartmentPayload } from '@/staffs/department/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly repository: Repository<Department>,
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
      await this.repository.delete({ id })
    }
    catch (e) {
      throw new FailedException('删除组织部门', e.message)
    }
  }
}
