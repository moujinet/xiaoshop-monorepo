import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductExportEntity } from './model/entity'
import { ProductExportRepositoryProvider } from './model/provider'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductExportEntity,
    ]),
  ],

  controllers: [],

  providers: [
    ProductExportRepositoryProvider,
  ],

  exports: [],
})
export class ProductExportModule {}
