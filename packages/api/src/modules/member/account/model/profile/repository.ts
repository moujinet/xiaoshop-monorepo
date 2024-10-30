import type {
  IMemberProfileRelations,
  IMemberProfileRepository,
  IMemberProfileSelect,
  IMemberProfileWhere,
} from './interface'

import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberGender, MemberSource, MemberStatus } from '@xiaoshop/shared'

import { nanoid } from '~/utils/uuid'
import { DEFAULT_PAGESIZE } from '~/common/constants'
import { toPaginationParams } from '~/utils/pagination'
import { comparePassword, generateSalt, hashPassword } from '~/utils/bcrypt'

import { MemberProfileEntity } from './entity'

const defaultSelect: IMemberProfileSelect = {
  id: true,
  status: true,
  source: true,
  username: true,
  nickname: true,
  avatar: true,
  mobile: true,
  birthday: true,
  gender: true,
  location: true,
  inviteCode: true,
  card: {
    id: true,
    key: true,
    type: true,
    badgeStyle: { image: true, icon: true, textColor: true, bgColor: true },
    dueTime: true,
    useTimes: true,
    limitTimes: true,
  },
  group: { id: true, name: true },
  tags: { id: true, name: true, color: true },
  account: { key: true, value: true },
  orderCount: true,
  orderAmount: true,
  redPacketCount: true,
  couponCount: true,
  checkInTimes: true,
  checkInDays: true,
  loginTimes: true,
  createdTime: true,
  updatedTime: true,
  lastLoginTime: true,
  lastOrderTime: true,
  lastCheckInTime: true,
}

const listSelect: IMemberProfileSelect = {
  id: true,
  status: true,
  source: true,
  nickname: true,
  avatar: true,
  mobile: true,
  birthday: true,
  gender: true,
  location: true,
  card: {
    id: true,
    key: true,
    type: true,
    badgeStyle: { image: true, icon: true, textColor: true, bgColor: true },
    dueTime: true,
    useTimes: true,
    limitTimes: true,
  },
  group: { id: true, name: true },
  tags: { id: true, name: true, color: true },
  account: { key: true, value: true },
  orderCount: true,
  orderAmount: true,
  lastLoginTime: true,
  lastOrderTime: true,
  createdTime: true,
}

@Injectable()
export class MemberProfileRepository implements IMemberProfileRepository {
  constructor(
    @InjectRepository(MemberProfileEntity)
    private readonly repo: Repository<MemberProfileEntity>,
  ) {}

  /**
   * @inheritdoc
   */
  async findAndCount(
    where: IMemberProfileWhere,
    page: number,
    pagesize = DEFAULT_PAGESIZE,
  ) {
    const {
      skip,
      take,
    } = toPaginationParams(page, pagesize)

    const [list, total] = await this.repo.findAndCount({
      select: listSelect,
      where,
      skip,
      take,
      relations: ['card', 'group', 'tags', 'account'],
      order: {
        createdTime: 'DESC',
      },
    })

    return {
      list,
      total,
      page,
      pagesize: take,
    }
  }

  /**
   * @inheritdoc
   */
  async find(
    where: IMemberProfileWhere,
    select: IMemberProfileSelect = listSelect,
    relations: IMemberProfileRelations = ['card', 'group', 'tags', 'account'],
  ) {
    return await this.repo.find({
      select,
      where,
      relations,
      order: {
        createdTime: 'DESC',
      },
    })
  }

  /**
   * @inheritdoc
   */
  async findOne(
    where: IMemberProfileWhere,
    select: IMemberProfileSelect = defaultSelect,
  ) {
    return await this.repo.findOne({
      select,
      where,
      relations: ['card', 'group', 'tags', 'account'],
    })
  }

  /**
   * @inheritdoc
   */
  async exists(where: IMemberProfileWhere) {
    return await this.repo.exists({
      where,
      relations: ['card', 'group', 'tags', 'account'],
    })
  }

  /**
   * @inheritdoc
   */
  async create(data: Partial<MemberProfileEntity>) {
    const profile = this.repo.create(data)

    profile.status = data.status || MemberStatus.NORMAL
    profile.source = data.source || MemberSource.MANUAL
    profile.username = data.username.trim()
    profile.nickname = data.nickname ? data.nickname.trim() : profile.username.trim()
    profile.mobile = data.mobile ? data.mobile.trim() : ''
    profile.gender = data.gender || MemberGender.UNKNOWN
    profile.birthday = data.birthday || null
    profile.location = data.location || []
    profile.avatar = data.avatar
    profile.tags = data.tags || []
    profile.groupId = data.groupId || 0
    profile.cardId = data.cardId || 0
    profile.salt = await generateSalt()
    profile.password = await hashPassword(data.password, profile.salt)
    profile.inviteCode = nanoid(8)

    return await this.repo.save(profile)
  }

  /**
   * @inheritdoc
   */
  async update(
    profile: MemberProfileEntity,
    data: Partial<MemberProfileEntity>,
  ) {
    const entity = this.repo.create({ id: profile.id })

    if (data.status !== undefined && data.status !== profile.status)
      entity.status = data.status

    if (data.username && data.username !== profile.username)
      entity.username = data.username.trim()

    if (data.nickname && data.nickname !== profile.nickname)
      entity.nickname = data.nickname.trim()

    if (data.mobile && data.mobile !== profile.mobile)
      entity.mobile = data.mobile.trim()

    if (data.gender !== undefined && data.gender !== profile.gender)
      entity.gender = data.gender

    if (data.birthday && data.birthday !== profile.birthday)
      entity.birthday = data.birthday.trim()

    if (data.location && data.location !== profile.location)
      entity.location = data.location

    if (data.avatar && data.avatar !== profile.avatar)
      entity.avatar = data.avatar.trim()

    if (data.cardId !== undefined && data.cardId !== profile.cardId)
      entity.cardId = data.cardId

    if (data.groupId !== undefined && data.groupId !== profile.groupId)
      entity.groupId = data.groupId

    if (data.tags && data.tags !== profile.tags)
      entity.tags = data.tags

    if (data.orderCount !== undefined && data.orderCount !== profile.orderCount)
      entity.orderCount = data.orderCount

    if (data.orderAmount !== undefined && data.orderAmount !== profile.orderAmount)
      entity.orderAmount = data.orderAmount

    if (data.redPacketCount !== undefined && data.redPacketCount !== profile.redPacketCount)
      entity.redPacketCount = data.redPacketCount

    if (data.couponCount !== undefined && data.couponCount !== profile.couponCount)
      entity.couponCount = data.couponCount

    if (data.checkInTimes !== undefined && data.checkInTimes !== profile.checkInTimes)
      entity.checkInTimes = data.checkInTimes

    if (data.checkInDays !== undefined && data.checkInDays !== profile.checkInDays)
      entity.checkInDays = data.checkInDays

    if (data.loginTimes !== undefined && data.loginTimes !== profile.loginTimes)
      entity.loginTimes = data.loginTimes

    if (data.lastLoginTime !== undefined && data.lastLoginTime !== profile.lastLoginTime)
      entity.lastLoginTime = data.lastLoginTime

    if (data.lastOrderTime !== undefined && data.lastOrderTime !== profile.lastOrderTime)
      entity.lastOrderTime = data.lastOrderTime

    if (data.lastCheckInTime !== undefined && data.lastCheckInTime !== profile.lastCheckInTime)
      entity.lastCheckInTime = data.lastCheckInTime

    if (data.password && !comparePassword(data.password, profile.password))
      entity.password = await hashPassword(data.password, profile.salt)

    return await this.repo.save(entity)
  }

  /**
   * @inheritdoc
   */
  async destroy(id: number) {
    await this.repo.delete(id)
  }

  /**
   * @inheritdoc
   */
  getRepository(): Repository<MemberProfileEntity> {
    return this.repo
  }
}
