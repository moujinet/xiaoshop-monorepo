import type { AssetType, YesOrNo } from '@xiaoshop/shared'

import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('asset_group', {
  comment: '素材分组',
})
@Index('IDX_asset_group', ['type', 'parentId', 'sort'])
export class AssetGroupEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '素材类型' })
  type: AssetType

  @Column({ name: 'parent_id', type: 'int', default: 0, unsigned: true, comment: '上级分组 ID' })
  parentId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '分组名称' })
  name: string

  @Column({ type: 'int', default: 1, unsigned: true, comment: '排序' })
  sort: number

  @Column({ name: 'enable_compress', type: 'tinyint', unsigned: true, default: 0, comment: '启用图片压缩' })
  enableCompress: YesOrNo

  @Column({ name: 'enable_watermark', type: 'tinyint', unsigned: true, default: 0, comment: '启用图片水印' })
  enableWatermark: YesOrNo

  @Column({ name: 'enable_thumbnail', type: 'tinyint', unsigned: true, default: 0, comment: '启用图片缩略图' })
  enableThumbnail: YesOrNo

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
