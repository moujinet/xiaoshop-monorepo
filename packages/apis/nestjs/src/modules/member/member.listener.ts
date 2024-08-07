import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class MemberListener {
  private readonly logger = new Logger(MemberListener.name)
}
