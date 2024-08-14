import type {
  IApiPaginationData,
  IMemberTag,
  IMemberTagDict,
  IMemberTagListItem,
} from '@xiaoshop/schema'
import { Not, Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberTag } from '@/member/tag/entity'
import { GetMemberTagPagesRequest, MemberTagPayload } from '@/member/tag/dto'
import { ExistsException, FailedException, NotFoundException } from '~/common/exception'
import { StaffLogService } from '@/staff/log/service'

@Injectable()
export class MemberTagService {
  constructor(
    @InjectRepository(MemberTag)
    private readonly repository: Repository<MemberTag>,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {}

  /**
   * 获取会员标签分页列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<IMemberTagListItem>>
   * @throws {FailedException} 获取会员标签分页列表失败
   */
  async findPages(
    query: GetMemberTagPagesRequest,
  ): Promise<IApiPaginationData<IMemberTagListItem>> {
    try {
      const pagesize = query.pagesize || 10
      const page = query.page || 1
      const [result, total] = await this.repository.findAndCount({
        select: {
          id: true,
          name: true,
          updatedTime: true,
        },
        skip: pagesize * (page - 1),
        take: pagesize,
        order: {
          updatedTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取会员标签分页列表', e.message)
    }
  }

  /**
   * 获取会员标签字典列表
   *
   * @returns Promise<IMemberTagDict[]>
   * @throws {FailedException} 获取会员标签字典失败
   */
  async findDictList(): Promise<IMemberTagDict[]> {
    try {
      return await this.repository.find({
        select: { id: true, name: true },
        order: { updatedTime: 'DESC' },
      })
    }
    catch (e) {
      throw new FailedException('获取会员标签字典', e.message)
    }
  }

  /**
   * 获取会员标签详情
   *
   * @param id 标签 ID
   * @returns Promise<IMemberTag>
   * @throws {NotFoundException} 未找到会员标签
   * @throws {FailedException} 获取会员标签详情失败
   */
  async findDetail(id: number): Promise<IMemberTag> {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('未找到会员标签')

      return await this.repository.findOneBy({ id })
    }
    catch (e) {
      throw new FailedException('获取会员标签详情', e.message, e.status)
    }
  }

  /**
   * 创建会员标签
   *
   * @param data 会员标签
   * @throws {ExistsException} 会员标签已存在
   * @throws {FailedException} 创建会员标签失败
   */
  async create(data: MemberTagPayload) {
    try {
      const exists = await this.repository.existsBy({ name: data.name })

      if (exists)
        throw new ExistsException(`会员标签「${data.name}」已存在`)

      const tag = new MemberTag()
      tag.name = data.name

      await this.repository.save(tag)
      await this.log.write('会员管理', `创建会员标签「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('创建会员标签', e.message, e.status)
    }
  }

  /**
   * 更新会员标签
   *
   * @param id 标签 ID
   * @param data 会员标签
   * @throws {NotFoundException} 未找到会员标签
   * @throws {FailedException} 更新会员标签失败
   * @throws {ExistsException} 会员标签已存在
   */
  async update(id: number, data: MemberTagPayload) {
    try {
      const founded = await this.repository.existsBy({ id })

      if (!founded)
        throw new NotFoundException('未找到会员标签')

      const exists = await this.repository.existsBy({
        id: Not(id),
        name: data.name,
      })

      if (exists)
        throw new ExistsException(`会员标签「${data.name}」已存在`)

      await this.repository.update(id, data)
      await this.log.write('会员管理', `更新会员标签「${data.name}」`)
    }
    catch (e) {
      throw new FailedException('更新会员标签', e.message, e.status)
    }
  }

  /**
   * 删除会员标签
   *
   * @param id 标签 ID
   * @throws {FailedException} 删除会员标签失败
   */
  async delete(id: number) {
    try {
      const tag = await this.repository.findOneBy({ id })

      if (tag) {
        await this.repository.delete({ id })
        await this.log.write('会员管理', `删除会员标签「${tag.name}」`)
      }
    }
    catch (e) {
      throw new FailedException('删除会员标签', e.message, e.status)
    }
  }
}
