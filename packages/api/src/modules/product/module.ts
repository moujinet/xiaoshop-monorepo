import { forwardRef, Module } from '@nestjs/common'

import { ProductMainModule } from './main/module'
import { ProductReviewModule } from './review/module'
import { ProductExportModule } from './export/module'
import { ProductAttributeModule } from './attribute/module'

@Module({
  imports: [
    forwardRef(() => ProductMainModule),
    forwardRef(() => ProductAttributeModule),
    forwardRef(() => ProductReviewModule),
    forwardRef(() => ProductExportModule),
  ],
})
export class ProductModule {}
