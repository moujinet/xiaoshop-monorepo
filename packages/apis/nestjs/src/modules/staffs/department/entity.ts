import type { IStaffDepartment } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('manage_staff_department', {
  comment: '组织部门表',
})
@Index('IDX_manage_staff_department', ['sort', 'updatedTime'])
export class Department implements IStaffDepartment {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_manage_staff_department' })
  id: number

  @Column({ name: 'parent_id', type: 'int', default: 0, unsigned: true, comment: '上级部门 ID' })
  parentId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '部门名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '部门描述' })
  desc: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
