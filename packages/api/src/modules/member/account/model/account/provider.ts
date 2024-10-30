import { Inject, Provider } from '@nestjs/common'

import { MemberAccountRepository } from './repository'

export const MemberAccountRepo = () => Inject('MemberAccountRepo')

export const MemberAccountRepositoryProvider: Provider = {
  provide: 'MemberAccountRepo',
  useClass: MemberAccountRepository,
}
