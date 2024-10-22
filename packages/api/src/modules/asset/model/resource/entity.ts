import type { AssetType } from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { AssetGroupEntity } from '@/asset/model/group/entity'

@Entity('asset_resource', {
  comment: '素材信息',
})
@Index('IDX_asset_resource', ['type', 'groupId', 'name', 'createdTime'])
export class AssetResourceEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '素材类型' })
  type: AssetType

  @Column({ name: 'group_id', type: 'int', default: 0, unsigned: true, comment: '素材分组 ID' })
  groupId: number

  @ManyToOne(() => AssetGroupEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'group_id' })
  group: AssetGroupEntity

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '文件名称' })
  name: string

  @Column({ name: 'mime_type', type: 'varchar', length: 64, nullable: false, default: '', comment: '文件 MIME 类型' })
  mimeType: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '文件路径' })
  path: string

  @Column({ type: 'int', default: 0, unsigned: true, comment: '文件大小' })
  size: number

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', comment: '创建时间' })
  createdTime: string
}
