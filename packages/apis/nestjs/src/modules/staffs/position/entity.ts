import type { IStaffDepartmentDict, IStaffPosition } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Department } from '@/staffs/department/entity'

@Entity('manage_staff_position', {
  comment: '组织职位表',
  orderBy: {
    sort: 'ASC',
    createdTime: 'DESC',
  },
})
@Index('idx_manage_staff_position', ['sort', 'createdTime'])
export class Position implements IStaffPosition {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_manage_staff_position' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '职位名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '职位描述' })
  desc: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @ManyToOne(() => Department, { createForeignKeyConstraints: false })
  @JoinColumn()
  department: IStaffDepartmentDict
}
