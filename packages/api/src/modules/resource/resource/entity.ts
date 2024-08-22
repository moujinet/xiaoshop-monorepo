import {
  type IResource,
  type IResourceGroupInfo,
  type IResourceType,
  ResourceType,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ResourceGroup } from '@/resource/group/entity'

@Entity('app_resource', {
  comment: '素材信息表',
})
@Index('IDX_app_resource', ['type', 'name', 'createdTime'])
export class Resource implements IResource {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_app_resource' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: ResourceType.IMAGE, comment: '素材类型' })
  type: IResourceType

  @Column({ name: 'group_id', type: 'int', default: 0, unsigned: true, comment: '素材分组 ID' })
  groupId: number

  @ManyToOne(() => ResourceGroup, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'group_id' })
  group: IResourceGroupInfo

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
