import {
  AuthUserStatus,
  type IAuthRolePermissions,
  type IAuthUser,
  type IOrganizeDepartmentDict,
  type IOrganizePositionDict,
  YesOrNo,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { AuthRole } from '@/auth/role/entity'
import { OrganizePosition } from '@/organize/position/entity'
import { OrganizeDepartment } from '@/organize/department/entity'

@Entity('manage_auth_user', {
  comment: '员工账号表',
})
@Index('IDX_manage_auth_user', ['status', 'username', 'departmentId', 'positionId', 'lastLoginTime'])
export class AuthUser implements IAuthUser {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'is_admin', type: 'tinyint', unsigned: true, default: YesOrNo.NO, comment: '是否管理员' })
  isAdmin: YesOrNo

  @Column({ type: 'tinyint', unsigned: true, default: AuthUserStatus.NORMAL, comment: '员工状态' })
  status: AuthUserStatus

  @Column({ name: 'department_id', type: 'int', unsigned: true, default: 0, comment: '部门 ID' })
  departmentId: number

  @OneToOne(() => OrganizeDepartment, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'department_id' })
  department: IOrganizeDepartmentDict

  @Column({ name: 'position_id', type: 'int', unsigned: true, default: 0, comment: '职位 ID' })
  positionId: number

  @OneToOne(() => OrganizePosition, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'position_id' })
  position: IOrganizePositionDict

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '员工账号' })
  username: string

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '员工密码' })
  password: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '员工密码盐值' })
  salt: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '员工姓名' })
  name: string

  @Column({ type: 'varchar', length: 16, nullable: false, default: '', comment: '员工手机' })
  mobile: string

  @ManyToMany(() => AuthRole, { cascade: true, createForeignKeyConstraints: false })
  @JoinTable({ name: 'manage_auth_user_has_roles', joinColumn: { name: 'user_id' }, inverseJoinColumn: { name: 'role_id' } })
  roles: IAuthRolePermissions[]

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string

  @Column({ name: 'locked_time', type: 'datetime', default: null, comment: '锁定时间' })
  lockedTime: string

  @Column({ name: 'last_login_time', type: 'datetime', default: null, comment: '最后登录时间' })
  lastLoginTime: string
}
