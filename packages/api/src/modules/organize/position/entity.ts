import type {
  IOrganizeDepartmentDict,
  IOrganizePosition,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { OrganizeDepartment } from '@/organize/department/entity'

@Entity({
  name: 'manage_organize_position',
  comment: '职位信息表',
})
@Index('IDX_manage_organize_position', ['departmentId', 'sort', 'updatedTime'])
export class OrganizePosition implements IOrganizePosition {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'department_id', type: 'int', default: 0, unsigned: true, comment: '所属部门 ID' })
  departmentId: number

  @ManyToOne(() => OrganizeDepartment, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'department_id' })
  department: IOrganizeDepartmentDict

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '职位名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '职位描述' })
  desc: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @CreateDateColumn({ name: 'created_time', type: 'datetime', update: false, default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
