import type {
  IResourceGroup,
  ResourceType,
  YesOrNo,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('app_resource_group', {
  comment: '素材分组表',
})
@Index('IDX_app_resource_group', ['type', 'parentId', 'updatedTime'])
export class ResourceGroup implements IResourceGroup {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '素材类型' })
  type: ResourceType

  @Column({ name: 'parent_id', type: 'int', default: 0, unsigned: true, comment: '上级分组 ID' })
  parentId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '分组名称' })
  name: string

  @Column({ name: 'enable_compress', type: 'tinyint', unsigned: true, default: 0, comment: '启用图片压缩' })
  enableCompress: YesOrNo

  @Column({ name: 'enable_watermark', type: 'tinyint', unsigned: true, default: 0, comment: '启用图片水印' })
  enableWatermark: YesOrNo

  @Column({ name: 'enable_thumbnail', type: 'tinyint', unsigned: true, default: 0, comment: '启用图片缩略图' })
  enableThumbnail: YesOrNo

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', comment: '更新时间' })
  updatedTime: string
}
