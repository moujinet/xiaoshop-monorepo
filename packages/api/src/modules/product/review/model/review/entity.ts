import type { ProductReviewStatus } from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm'

import { ProductEntity } from '@/product/main/model/product/entity'

import { ProductReviewReplyEntity } from '../reply/entity'

@Entity('product_review', {
  comment: '商品评价',
})
@Index('IDX_product_review', ['productId', 'memberId', 'status', 'createdTime'])
export class ProductReviewEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'product_id', type: 'int', default: 0, unsigned: true, comment: '评价商品 ID' })
  productId: number

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: Relation<ProductEntity>

  @Column({ name: 'member_id', type: 'int', default: 0, unsigned: true, comment: '评价会员 ID' })
  memberId: number

  @Column({ name: 'product_score', type: 'int', default: 5, unsigned: true, comment: '商品评分' })
  productScore: number

  @Column({ name: 'service_score', type: 'int', default: 5, unsigned: true, comment: '服务评分' })
  serviceScore: number

  @Column({ name: 'logistics_score', type: 'int', default: 5, unsigned: true, comment: '物流评分' })
  logisticsScore: number

  @Column({ type: 'tinyint', default: 0, unsigned: true, comment: '评价审核状态' })
  status: ProductReviewStatus

  @Column({ type: 'simple-array', default: null, comment: '评价图片' })
  images: string[]

  @Column({ type: 'varchar', length: 200, default: '', comment: '评价内容' })
  content: string

  @OneToMany(() => ProductReviewReplyEntity, r => r.review, { createForeignKeyConstraints: false })
  replies: ProductReviewReplyEntity[]

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, update: false, comment: '评价时间' })
  createdTime: string
}
