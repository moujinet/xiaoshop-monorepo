import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'system_department',
  comment: '部门信息表',
})
@Index('IDX_system_department', ['sort', 'updatedTime'])
export class Department {
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

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
