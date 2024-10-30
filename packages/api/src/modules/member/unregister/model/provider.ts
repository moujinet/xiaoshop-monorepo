import { Inject, Provider } from '@nestjs/common'

import { MemberUnregisterRepository } from './repository'

export const MemberUnregisterRepo = () => Inject('MemberUnregisterRepo')

export const MemberUnregisterRepositoryProvider: Provider = {
  provide: 'MemberUnregisterRepo',
  useClass: MemberUnregisterRepository,
}
