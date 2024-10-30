import { Inject, Provider } from '@nestjs/common'

import { MemberCardUpgradeRepository } from './repository'

export const MemberCardUpgradeRepo = () => Inject('MemberCardUpgradeRepo')

export const MemberCardUpgradeRepositoryProvider: Provider = {
  provide: 'MemberCardUpgradeRepo',
  useClass: MemberCardUpgradeRepository,
}
