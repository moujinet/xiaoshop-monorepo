import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductAttributeTemplateEntity } from './model/template/entity'
import { ProductAttributeTemplateService } from './domain/template/service'
import { ProductAttributeTemplateRepositoryProvider } from './model/template/provider'
import { ProductAttributeTemplateAdminController } from './controller/template/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductAttributeTemplateEntity,
    ]),
  ],

  controllers: [
    ProductAttributeTemplateAdminController,
  ],

  providers: [
    ProductAttributeTemplateRepositoryProvider,
    ProductAttributeTemplateService,
  ],

  exports: [
    ProductAttributeTemplateService,
  ],
})
export class ProductAttributeModule {}
