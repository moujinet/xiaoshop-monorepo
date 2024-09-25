import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { MemberAccount } from './entity'

@Injectable()
export class MemberAccountService {
  constructor(
    @InjectRepository(MemberAccount)
    private readonly repository: Repository<MemberAccount>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}
}
