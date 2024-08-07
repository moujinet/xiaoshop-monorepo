import { AssetType, Enabled, type IAssetGroup, type IAssetType, type IEnabled } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('app_assets_group', {
  comment: '素材分组表',
})
@Index('IDX_app_assets_group', ['parentId', 'type', 'name'])
export class AssetGroup implements IAssetGroup {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_app_assets_group' })
  id: number

  @Column({ name: 'parent_id', type: 'int', default: 0, unsigned: true, comment: '上级分组 ID' })
  parentId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: AssetType.IMAGE, comment: '素材类型' })
  type: IAssetType

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '分组名称' })
  name: string

  @Column({ name: 'enable_compress', type: 'char', length: 1, nullable: false, default: Enabled.NO, comment: '启用图片压缩 (N:否 Y:是)' })
  enableCompress: IEnabled

  @Column({ name: 'enable_watermark', type: 'char', length: 1, nullable: false, default: Enabled.NO, comment: '启用图片水印 (N:否 Y:是)' })
  enableWatermark: IEnabled

  @Column({ name: 'enable_thumbnail', type: 'char', length: 1, nullable: false, default: Enabled.NO, comment: '启用图片缩略图 (N:否 Y:是)' })
  enableThumbnail: IEnabled

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', comment: '创建时间' })
  createdTime: string
}
