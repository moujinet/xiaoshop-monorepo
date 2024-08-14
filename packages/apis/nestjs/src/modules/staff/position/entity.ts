import type { IStaffDepartmentDict, IStaffPosition } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { StaffDepartment } from '@/staff/department/entity'

@Entity('manage_staff_position', {
  comment: '组织职位表',
})
@Index('IDX_manage_staff_position', ['sort', 'updatedTime'])
export class StaffPosition implements IStaffPosition {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_manage_staff_position' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '职位名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '职位描述' })
  desc: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string

  @ManyToOne(() => StaffDepartment, { createForeignKeyConstraints: false })
  @JoinColumn()
  department: IStaffDepartmentDict
}
