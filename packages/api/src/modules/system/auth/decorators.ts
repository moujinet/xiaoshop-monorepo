import { SetMetadata } from '@nestjs/common'

import { ADMIN_KEY, PUBLIC_KEY } from './constants'

/**
 * 管理权限
 */
export const Admin = () => SetMetadata(ADMIN_KEY, true)

/**
 * 公共权限
 */
export const Public = () => SetMetadata(PUBLIC_KEY, true)
