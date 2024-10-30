import { Inject, Provider } from '@nestjs/common'

import { MemberTagRepository } from './repository'

export const MemberTagRepo = () => Inject('MemberTagRepo')

export const MemberTagRepositoryProvider: Provider = {
  provide: 'MemberTagRepo',
  useClass: MemberTagRepository,
}
