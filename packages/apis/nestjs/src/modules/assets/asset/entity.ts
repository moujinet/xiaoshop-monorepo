import { AssetType, type IAsset, type IAssetGroupInfo, type IAssetType } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AssetGroup } from '@/assets/group/entity'

@Entity('app_assets', {
  comment: '素材信息表',
})
@Index('idx_app_asset', ['type', 'name'])
export class Asset implements IAsset {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_app_assets' })
  id: number

  @ManyToOne(() => AssetGroup, { createForeignKeyConstraints: false })
  @JoinColumn()
  group: IAssetGroupInfo

  @Column({ type: 'varchar', length: 32, nullable: false, default: AssetType.IMAGE, comment: '素材类型' })
  type: IAssetType

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '文件名称' })
  name: string

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '文件路径' })
  path: string

  @Column({ type: 'int', default: 0, unsigned: true, comment: '文件大小' })
  size: number

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', comment: '创建时间' })
  createdTime: string
}
