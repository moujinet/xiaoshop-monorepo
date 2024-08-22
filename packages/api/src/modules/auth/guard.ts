import type {
  IAuthUserLoginSignPayload,
  IAuthUserProfile,
} from '@xiaoshop/shared'
import {
  type CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common'
import { Request } from 'express'
import { ClsService } from 'nestjs-cls'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { UnauthorizedException } from '~/common/exceptions'
import {
  AUTH_ADMIN_KEY,
  AUTH_PUBLIC_KEY,
} from '@/auth/constants'

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name)

  constructor(
    @Inject()
    private readonly jwt: JwtService,

    @Inject()
    private readonly reflector: Reflector,

    @Inject()
    private readonly config: ConfigService,

    @Inject()
    private readonly cls: ClsService,
  ) {}

  /**
   * 检查是否可以通过认证
   *
   * @param context ExecutionContext
   * @returns Promise<boolean>
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.getScope(AUTH_PUBLIC_KEY, context)

    if (isPublic)
      return true

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token)
      throw new UnauthorizedException()

    try {
      const payload = await this.jwt.verifyAsync<IAuthUserLoginSignPayload>(token, {
        secret: this.config.get<string>('jwt.secret'),
      })

      const isAdmin = this.getScope(AUTH_ADMIN_KEY, context)

      if (isAdmin && payload.scope !== AUTH_ADMIN_KEY)
        throw new UnauthorizedException()

      this.cls.set<IAuthUserProfile>('USER', payload.user)
    }
    catch (e) {
      throw new UnauthorizedException(e.message)
    }

    return true
  }

  /**
   * 从请求中提取令牌
   *
   * @param request Request
   * @returns string | undefined
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }

  /**
   * 检查是否在指定范围内
   *
   * @param key string
   * @param context ExecutionContext
   * @returns boolean
   */
  private getScope(key: string, context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>(key, [
      context.getHandler(),
      context.getClass(),
    ])
  }
}
