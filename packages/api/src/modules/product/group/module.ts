import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductGroupEntity } from './model/entity'
import { ProductGroupService } from './domain/manage/service'
import { ProductGroupRepositoryProvider } from './model/provider'
import { ProductGroupAdminController } from './controller/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductGroupEntity,
    ]),
  ],

  controllers: [
    ProductGroupAdminController,
  ],

  providers: [
    ProductGroupRepositoryProvider,
    ProductGroupService,
  ],

  exports: [
    ProductGroupRepositoryProvider,
    ProductGroupService,
  ],
})
export class ProductGroupModule {}
