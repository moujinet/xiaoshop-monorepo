import { Inject, Provider } from '@nestjs/common'

import { MemberCardBindRepository } from './repository'

export const MemberCardBindRepo = () => Inject('MemberCardBindRepo')

export const MemberCardBindRepositoryProvider: Provider = {
  provide: 'MemberCardBindRepo',
  useClass: MemberCardBindRepository,
}
