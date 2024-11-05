import { Inject, Provider } from '@nestjs/common'

import { ProductExportRepository } from './repository'

export const ProductExportRepo = () => Inject('ProductExportRepo')

export const ProductExportRepositoryProvider: Provider = {
  provide: 'ProductExportRepo',
  useClass: ProductExportRepository,
}
