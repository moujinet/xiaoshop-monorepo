import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'

import { ProductReviewEntity } from '../review/entity'

@Entity('product_review_reply', {
  comment: '商品评价回复',
})
@Index('IDX_product_review_reply', ['reviewId', 'userId', 'createdTime'])
export class ProductReviewReplyEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'review_id', type: 'int', default: 0, unsigned: true, comment: '评价 ID' })
  reviewId: number

  @ManyToOne(() => ProductReviewEntity)
  @JoinColumn({ name: 'review_id' })
  review: Relation<ProductReviewEntity>

  @Column({ name: 'user_id', type: 'int', default: 0, unsigned: true, comment: '回复用户 ID (admin)' })
  userId: number

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '回复内容' })
  content: string

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, update: false, comment: '回复时间' })
  createdTime: string
}
