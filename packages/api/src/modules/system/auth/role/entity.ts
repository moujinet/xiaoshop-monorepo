import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'system_role',
  comment: '系统角色信息表',
})
@Index('IDX_system_role', ['sort', 'updatedTime'])
export class SystemRoleEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '角色名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '角色描述' })
  desc: string

  @Column({ type: 'simple-json', default: null, comment: '角色权限' })
  permissions: string[]

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
