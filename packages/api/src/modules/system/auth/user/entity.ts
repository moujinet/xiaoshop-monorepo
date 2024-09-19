import type { SystemUserStatus, YesOrNo } from '@xiaoshop/shared'

import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { SystemRole } from '@/system/auth/role/entity'
import { SystemDepartment } from '@/system/organize/department/entity'
import { SystemDepartmentPosition } from '@/system/organize/position/entity'

@Entity({
  name: 'system_user',
  comment: '系统用户信息表',
})
@Index('IDX_system_user', ['status', 'name', 'mobile', 'departmentId', 'positionId', 'lastLoginTime'])
@Index('IDX_system_user_login', ['isAdmin', 'status', 'username'], { unique: true })
export class SystemUser {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'is_admin', type: 'tinyint', unsigned: true, default: 0, comment: '是否系统管理员' })
  isAdmin: YesOrNo

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '系统用户状态' })
  status: SystemUserStatus

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '用户名' })
  username: string

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '用户密码' })
  password: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '密码盐值' })
  salt: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '真实姓名' })
  name: string

  @Column({ type: 'varchar', length: 16, nullable: false, default: '', comment: '手机号' })
  mobile: string

  @ManyToMany(() => SystemRole, { cascade: true, createForeignKeyConstraints: false })
  @JoinTable({ name: 'system_user_has_roles', joinColumn: { name: 'user_id' }, inverseJoinColumn: { name: 'role_id' } })
  roles: SystemRole[]

  @Column({ name: 'department_id', type: 'int', unsigned: true, default: 0, comment: '部门 ID' })
  departmentId: number

  @OneToOne(() => SystemDepartment, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'department_id' })
  department: SystemDepartment

  @Column({ name: 'position_id', type: 'int', unsigned: true, default: 0, comment: '职位 ID' })
  positionId: number

  @OneToOne(() => SystemDepartmentPosition, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'position_id' })
  position: SystemDepartmentPosition

  @Column({ name: 'last_login_ip', type: 'varchar', length: 32, nullable: false, default: '', comment: '最后登录 IP 及地区' })
  lastLoginIp: string

  @Column({ name: 'last_login_time', type: 'datetime', default: null, comment: '最后登录时间' })
  lastLoginTime: string

  @Column({ name: 'last_locked_ip', type: 'varchar', length: 32, nullable: false, default: '', comment: '最后锁定 IP 及地区' })
  lastLockedIp: string

  @Column({ name: 'locked_time', type: 'datetime', default: null, comment: '锁定时间' })
  lockedTime: string
}
