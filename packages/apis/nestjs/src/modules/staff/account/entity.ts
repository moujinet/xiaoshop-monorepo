import {
  Enabled,
  type IEnabled,
  type IStaffAccount,
  type IStaffAccountStatus,
  type IStaffDepartmentDict,
  type IStaffPositionDict,
  type IStaffRoleInfo,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { StaffRole } from '@/staff/role/entity'
import { StaffPosition } from '@/staff/position/entity'
import { StaffDepartment } from '@/staff/department/entity'

@Entity('manage_staff_account', {
  comment: '员工账号表',
})
@Index('IDX_manage_staff_account', ['status', 'username', 'mobile', 'lastLoginTime'])
export class StaffAccount implements IStaffAccount {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_manage_staff_account' })
  id: number

  @Column({ name: 'is_admin', type: 'char', length: 1, nullable: false, default: Enabled.NO, comment: '是否管理员 (N: 否 Y: 是)' })
  isAdmin: IEnabled

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '员工状态' })
  status: IStaffAccountStatus

  @Column({ name: 'department_id', type: 'int', unsigned: true, default: 0, comment: '部门 ID' })
  departmentId: number

  @Column({ name: 'position_id', type: 'int', unsigned: true, default: 0, comment: '职位 ID' })
  positionId: number

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

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string

  @Column({ name: 'last_login_time', type: 'datetime', default: null, comment: '最后登录时间' })
  lastLoginTime: string

  @ManyToMany(() => StaffRole, { cascade: true, createForeignKeyConstraints: false })
  @JoinTable({ name: 'manage_staff_account_has_roles', joinColumn: { name: 'staff_id' }, inverseJoinColumn: { name: 'role_id' } })
  roles: IStaffRoleInfo[]

  @OneToOne(() => StaffDepartment, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'department_id' })
  department: IStaffDepartmentDict

  @OneToOne(() => StaffPosition, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'position_id' })
  position: IStaffPositionDict
}
