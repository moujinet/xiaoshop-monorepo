import { Inject, Provider } from '@nestjs/common'

import { MemberPointsChangeRepository } from './repository'

export const MemberPointsChangeRepo = () => Inject('MemberPointsChangeRepo')

export const MemberPointsChangeRepositoryProvider: Provider = {
  provide: 'MemberPointsChangeRepo',
  useClass: MemberPointsChangeRepository,
}
