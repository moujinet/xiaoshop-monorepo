import {
  type CustomDecorator,
  SetMetadata,
} from '@nestjs/common'

import { IS_ADMIN_KEY } from '~/common/constants'

export const Admin = (): CustomDecorator => SetMetadata(IS_ADMIN_KEY, true)
