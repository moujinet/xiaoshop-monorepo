import type { ISystemLoginSignData } from '@xiaoshop/shared'

import { Request } from 'express'
import { ClsService } from 'nestjs-cls'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { type CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'

import { UnauthorizedException } from '~/common/exceptions'
import { IS_ADMIN_KEY, IS_PUBLIC_KEY, REQUEST_ADMIN_KEY } from '~/common/constants'

@Injectable()
export class SystemAuthGuard implements CanActivate {
  constructor(
    @Inject(Reflector)
    private readonly reflector: Reflector,

    @Inject(ConfigService)
    private readonly config: ConfigService,

    @Inject(JwtService)
    private readonly jwt: JwtService,

    @Inject(ClsService)
    private readonly cls: ClsService,
  ) {}

  /**
   * 检查是否可以通过认证
   *
   * @param context ExecutionContext
   * @returns Promise<boolean>
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.getScope(IS_PUBLIC_KEY, context)

    if (isPublic)
      return true

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token)
      throw new UnauthorizedException('请求未授权')

    try {
      const payload = await this.jwt.verifyAsync<ISystemLoginSignData>(token, {
        secret: this.config.get<string>('jwt.secret'),
      })

      const isAdmin = this.getScope(IS_ADMIN_KEY, context)

      if (isAdmin && payload.scope !== IS_ADMIN_KEY)
        throw new UnauthorizedException('请求未授权')

      this.cls.set<ISystemLoginSignData['user']>(
        REQUEST_ADMIN_KEY,
        payload.user,
      )
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
