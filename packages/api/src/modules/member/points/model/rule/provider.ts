import { Inject, Provider } from '@nestjs/common'

import { MemberPointsRuleRepository } from './repository'

export const MemberPointsRuleRepo = () => Inject('MemberPointsRuleRepo')

export const MemberPointsRuleRepositoryProvider: Provider = {
  provide: 'MemberPointsRuleRepo',
  useClass: MemberPointsRuleRepository,
}
