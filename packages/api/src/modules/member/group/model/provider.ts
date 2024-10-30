import { Inject, Provider } from '@nestjs/common'

import { MemberGroupRepository } from './repository'

export const MemberGroupRepo = () => Inject('MemberGroupRepo')

export const MemberGroupRepositoryProvider: Provider = {
  provide: 'MemberGroupRepo',
  useClass: MemberGroupRepository,
}
