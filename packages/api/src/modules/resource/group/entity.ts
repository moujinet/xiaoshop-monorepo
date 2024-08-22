import {
  type IResourceGroup,
  type IResourceType,
  type IYesOrNo,
  ResourceType,
  YesOrNo,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('app_resource_group', {
  comment: '素材分组表',
})
@Index('IDX_app_resource_group', ['type', 'parentId', 'updatedTime'])
export class ResourceGroup implements IResourceGroup {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_app_resource_group' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: ResourceType.IMAGE, comment: '素材类型' })
  type: IResourceType

  @Column({ name: 'parent_id', type: 'int', default: 0, unsigned: true, comment: '上级分组 ID' })
  parentId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '分组名称' })
  name: string

  @Column({ name: 'enable_compress', type: 'char', length: 1, nullable: false, default: YesOrNo.NO, comment: '启用图片压缩 (N:否 Y:是)' })
  enableCompress: IYesOrNo

  @Column({ name: 'enable_watermark', type: 'char', length: 1, nullable: false, default: YesOrNo.NO, comment: '启用图片水印 (N:否 Y:是)' })
  enableWatermark: IYesOrNo

  @Column({ name: 'enable_thumbnail', type: 'char', length: 1, nullable: false, default: YesOrNo.NO, comment: '启用图片缩略图 (N:否 Y:是)' })
  enableThumbnail: IYesOrNo

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', comment: '更新时间' })
  updatedTime: string
}
