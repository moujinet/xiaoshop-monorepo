import { Inject, Provider } from '@nestjs/common'

import { MemberProfileRepository } from './repository'

export const MemberProfileRepo = () => Inject('MemberProfileRepo')

export const MemberProfileRepositoryProvider: Provider = {
  provide: 'MemberProfileRepo',
  useClass: MemberProfileRepository,
}
