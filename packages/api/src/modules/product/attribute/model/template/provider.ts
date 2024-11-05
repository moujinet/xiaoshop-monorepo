import { Inject, Provider } from '@nestjs/common'

import { ProductAttributeTemplateRepository } from './repository'

export const ProductAttributeTemplateRepo = () => Inject('ProductAttributeTemplateRepo')

export const ProductAttributeTemplateRepositoryProvider: Provider = {
  provide: 'ProductAttributeTemplateRepo',
  useClass: ProductAttributeTemplateRepository,
}
