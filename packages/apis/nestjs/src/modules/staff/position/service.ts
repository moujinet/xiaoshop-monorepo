import type { IApiPaginationData, IStaffPosition, IStaffPositionDict } from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StaffLogService } from '@/staff/log/service'
import { StaffPosition } from '@/staff/position/entity'
import { StaffDepartment } from '@/staff/department/entity'
import { GetPositionPagesRequest, PositionPayload } from '@/staff/position/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'
import { useQueryPagination } from '~/hooks/pagination'

@Injectable()
export class StaffPositionService {
  constructor(
    @InjectRepository(StaffPosition)
    private readonly repository: Repository<StaffPosition>,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {}

  /**
   * 获取部门职位分页列表
   *
   * @param query GetPositionPagesRequest
   * @throws FailedException
   * @returns Promise<IApiPaginationData<IStaffPosition>>
   * @see {@link IStaffPosition}
   */
  async findPages(query: GetPositionPagesRequest): Promise<IApiPaginationData<IStaffPosition>> {
    try {
      const entity = this.repository.createQueryBuilder('entity')

      entity.addSelect('department.id')
      entity.addSelect('department.name')

      entity.leftJoin('entity.department', 'department')

      if (query.departmentId && query.departmentId > 0)
        entity.andWhere('department.id = :departmentId', { departmentId: query.departmentId })

      if (query.name)
        entity.andWhere('entity.name LIKE :name', { name: `%${query.name}%` })

      entity.orderBy('entity.updatedTime', 'DESC')

      return await useQueryPagination<IStaffPosition>(entity, query.page || 1, query.pagesize || 10)
    }
    catch (e) {
      throw new FailedException('获取部门职位列表', e.message)
    }
  }

  /**
   * 获取指定部门的职位列表
   *
   * @throws FailedException
   * @returns Promise<IStaffPositionDict[]>
   * @see {@link IStaffPositionDict}
   */
  async findList(departmentId: number): Promise<IStaffPositionDict[]> {
    try {
      return await this.repository.find({
        select: [
          'id',
          'name',
        ],
        where: {
          department: {
            id: departmentId,
          },
        },
      })
    }
    catch (e) {
      throw new FailedException('获取指定部门的职位列表', e.message)
    }
  }

  /**
   * 获取部门职位详情
   *
   * @param id number
   * @throws FailedException
   * @throws NotFoundException
   * @returns Promise<IStaffPosition>
   * @see {@link IStaffPosition}
   */
  async findDetail(id: number): Promise<IStaffPosition> {
    try {
      const detail = await this.repository.findOne({
        select: {
          department: {
            id: true,
            name: true,
          },
        },
        where: {
          id,
        },
        relations: [
          'department',
        ],
      })

      if (!detail)
        throw new NotFoundException('部门职位')

      return detail
    }
    catch (e) {
      throw new FailedException('获取部门职位详情', e.message, e.status)
    }
  }

  /**
   * 创建部门职位
   *
   * @param data PositionPayload
   * @throws FailedException
   * @throws ExistsException
   * @see {@link PositionPayload}
   */
  async create(data: PositionPayload) {
    try {
      const exists = await this.repository.exists({
        where: {
          department: {
            id: data.departmentId,
          },
          name: data.name,
        },
        relations: [
          'department',
        ],
      })

      if (exists)
        throw new ExistsException(`部门职位 [${data.name}] `)

      const position = new StaffPosition()

      position.name = data.name
      position.desc = data.desc
      position.sort = data.sort

      const department = new StaffDepartment()

      department.id = data.departmentId
      position.department = department

      await this.repository.save(position)
      await this.log.write('权限管理', `创建职位「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('创建部门职位', e.message, e.status)
    }
  }

  /**
   * 更新部门职位
   *
   * @param id number
   * @param data PositionPayload
   * @throws FailedException
   * @throws NotFoundException
   * @throws ExistsException
   * @see {@link PositionPayload}
   */
  async update(id: number, data: PositionPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException(`部门职位 [${data.name}] `)

      const exists = await this.repository.exists({
        where: {
          id: Not(id),
          department: {
            id: data.departmentId,
          },
          name: data.name,
        },
        relations: [
          'department',
        ],
      })

      if (exists)
        throw new ExistsException(`部门职位 [${data.name}] `)

      const position = new StaffPosition()

      position.id = id
      position.name = data.name
      position.desc = data.desc
      position.sort = data.sort

      const department = new StaffDepartment()

      department.id = data.departmentId
      position.department = department

      await this.repository.save(position)
      await this.log.write('权限管理', `更新职位「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('更新部门职位', e.message, e.status)
    }
  }

  /**
   * 删除部门职位
   *
   * @param id number
   * @throws FailedException
   */
  async delete(id: number) {
    try {
      const position = await this.repository.findOne({ where: { id }, relations: ['department'] })

      if (position) {
        await this.repository.delete({ id })
        await this.log.write('权限管理', `删除职位「${position.department.name}/${position.name}」`)
      }
    }
    catch (e) {
      throw new FailedException('删除部门职位', e.message)
    }
  }
}
