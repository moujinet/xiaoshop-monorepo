import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'manage_organize_department',
  comment: '部门信息表',
})
@Index('IDX_manage_organize_department', ['sort', 'updatedTime'])
export class OrganizeDepartment {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'parent_id', type: 'int', default: 0, unsigned: true, comment: '上级部门 ID' })
  parentId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '部门名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '部门描述' })
  desc: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @CreateDateColumn({ name: 'created_time', type: 'datetime', update: false, default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
