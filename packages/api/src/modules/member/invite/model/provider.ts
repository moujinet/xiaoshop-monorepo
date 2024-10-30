import { Inject, Provider } from '@nestjs/common'

import { MemberInviteRepository } from './repository'

export const MemberInviteRepo = () => Inject('MemberInviteRepo')

export const MemberInviteRepositoryProvider: Provider = {
  provide: 'MemberInviteRepo',
  useClass: MemberInviteRepository,
}
