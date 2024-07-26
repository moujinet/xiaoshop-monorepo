import type { IEnabled } from '@/common'
import type { IStaffAccountStatus } from '@/staffs/types'
import type {
  IStaffDepartmentDict,
  IStaffPositionDict,
  IStaffRoleInfo,
} from '@/staffs/models'

/**
 * 员工账号
 */
export interface IStaffAccount {
  /**
   * 员工 ID
   */
  id: number
  /**
   * 是否管理员  (N: 否; Y: 是)
   */
  isAdmin: IEnabled
  /**
   * 员工状态
   *
   * @see {@link IStaffAccountStatus}
   */
  status: IStaffAccountStatus
  /**
   * 员工账号
   */
  username: string
  /**
   * 员工密码
   */
  password: string
  /**
   * 员工密码盐值
   */
  salt: string
  /**
   * 员工角色
   *
   * @see {@link IStaffRoleInfo}
   */
  roles: IStaffRoleInfo[]
  /**
   * 员工部门
   *
   * @see {@link IStaffDepartmentDict}
   */
  department: IStaffDepartmentDict
  /**
   * 员工职位
   *
   * @see {@link IStaffPositionDict}
   */
  position: IStaffPositionDict
  /**
   * 员工姓名
   */
  name: string
  /**
   * 员工手机
   */
  mobile: string
  /**
   * 创建日期
   */
  createdTime: string
  /**
   * 更新日期
   */
  updatedTime: string
  /**
   * 最后登录日期
   */
  lastLoginTime: string
}

/**
 * 员工账号 - 档案详情
 */
export type IStaffAccountProfile = Omit<IStaffAccount, 'password' | 'salt'>

/**
 * 员工账号 - 基本信息
 */
export type IStaffAccountInfo = Pick<IStaffAccount, 'id' | 'name' | 'username' | 'mobile'>
