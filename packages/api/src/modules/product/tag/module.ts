import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductTagEntity } from './model/entity'
import { ProductTagService } from './domain/manage/service'
import { ProductTagRepositoryProvider } from './model/provider'
import { ProductTagAdminController } from './controller/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductTagEntity,
    ]),
  ],

  controllers: [
    ProductTagAdminController,
  ],

  providers: [
    ProductTagRepositoryProvider,
    ProductTagService,
  ],

  exports: [
    ProductTagRepositoryProvider,
    ProductTagService,
  ],
})
export class ProductTagModule {}
