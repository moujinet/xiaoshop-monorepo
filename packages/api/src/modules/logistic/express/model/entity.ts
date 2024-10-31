import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('logistic_express', {
  comment: '快递公司信息表',
})
@Index('IDX_logistic_express', ['sort'])
export class LogisticExpressEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '公司名称' })
  name: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '公司介绍' })
  desc: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '公司 LOGO' })
  logo: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '公司官网' })
  url: string

  @Column({ type: 'int', default: 1, unsigned: true, comment: '排序' })
  sort: number

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
