import { type CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { ClsService } from 'nestjs-cls'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { IStaffLoginProfile } from '@xiaoshop/schema'
import { UnauthorizedException } from '~/common/exception'
import {
  AUTH_IS_ADMIN,
  AUTH_IS_PUBLIC,
} from '@/auth/constants'

@Injectable()
export class AuthGuard implements CanActivate {
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
    const isPublic = this.isScope(AUTH_IS_PUBLIC, context)

    if (isPublic)
      return true

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token)
      throw new UnauthorizedException()

    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: this.config.get<string>('jwt.secret'),
      })

      const isAdmin = this.isScope(AUTH_IS_ADMIN, context)

      if (isAdmin && payload.scope !== AUTH_IS_ADMIN)
        throw new UnauthorizedException()

      this.cls.set<IStaffLoginProfile>('USER', payload.user)
      request.user = payload.user
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
  private isScope(key: string, context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>(key, [
      context.getHandler(),
      context.getClass(),
    ])
  }
}
