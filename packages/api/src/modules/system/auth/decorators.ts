import { SetMetadata } from '@nestjs/common'

import { AUTH_ADMIN_KEY, AUTH_PUBLIC_KEY } from './constants'

/**
 * 管理权限
 */
export const Admin = () => SetMetadata(AUTH_ADMIN_KEY, true)

/**
 * 公共权限
 */
export const Public = () => SetMetadata(AUTH_PUBLIC_KEY, true)
