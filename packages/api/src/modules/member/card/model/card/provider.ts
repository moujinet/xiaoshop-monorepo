import { Inject, Provider } from '@nestjs/common'

import { MemberCardRepository } from './repository'

export const MemberCardRepo = () => Inject('MemberCardRepo')

export const MemberCardRepositoryProvider: Provider = {
  provide: 'MemberCardRepo',
  useClass: MemberCardRepository,
}
