import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberPointsLog } from '@/member/points-log/entity'

@Injectable()
export class MemberPointsLogService {
  constructor(
    @InjectRepository(MemberPointsLog)
    private readonly repository: Repository<MemberPointsLog>,
  ) {}
}
