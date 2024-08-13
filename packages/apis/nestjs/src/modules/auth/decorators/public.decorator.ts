import { SetMetadata } from '@nestjs/common'
import { AUTH_IS_PUBLIC } from '@/auth/constants'

export const Public = () => SetMetadata(AUTH_IS_PUBLIC, true)
