import { SetMetadata } from '@nestjs/common'
import { AUTH_IS_ADMIN } from '@/auth/constants'

export const Admin = () => SetMetadata(AUTH_IS_ADMIN, true)
