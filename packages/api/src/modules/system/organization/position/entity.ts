import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { SystemDepartmentEntity } from '@/system/organization/department/entity'

@Entity({
  name: 'system_department_position',
  comment: '部门职位信息表',
})
@Index('IDX_system_department_position', ['departmentId', 'sort', 'updatedTime'])
export class SystemPositionEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'department_id', type: 'int', default: 0, unsigned: true, comment: '所属部门 ID' })
  departmentId: number

  @ManyToOne(() => SystemDepartmentEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'department_id' })
  department: SystemDepartmentEntity

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '职位名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '职位描述' })
  desc: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
