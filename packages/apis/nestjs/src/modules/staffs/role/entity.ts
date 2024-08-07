import type { IStaffRole } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('manage_staff_role', {
  comment: '员工角色表',
})
@Index('IDX_manage_staff_role', ['sort', 'updatedTime'])
export class Role implements IStaffRole {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_manage_staff_role' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '角色名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '角色描述' })
  desc: string

  @Column({ type: 'simple-json', default: null, comment: '角色权限' })
  permissions: string[]

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
