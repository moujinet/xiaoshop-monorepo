import type { ISystemUserExtraInfo, ISystemUserInfo } from './user'

/**
 * 系统登录令牌
 */
export interface ISystemLoginToken {
  /**
   * 登录令牌
   */
  token: string
}

/**
 * 系统登录签名
 */
export interface ISystemLoginSignData {
  /**
   * 登录范围
   */
  scope: string
  /**
   * 登录系统用户
   */
  user: ISystemUserInfo & ISystemUserExtraInfo
}
