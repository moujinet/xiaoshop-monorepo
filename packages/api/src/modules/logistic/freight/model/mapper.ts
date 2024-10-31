import type { ILogisticFreightTemplateInfo, ILogisticFreightTemplateList } from '@xiaoshop/shared'

import { LOGISTIC_FREIGHT_CALC_MODES } from '~/dicts'
import { objectToDict, pipeDict, toDict } from '~/utils/transformer'

import { LogisticFreightTemplateEntity } from './entity'

/**
 * Transform entities to list
 */
export function toLogisticFreightList(templates: LogisticFreightTemplateEntity[]) {
  return pipeDict<ILogisticFreightTemplateList>(templates, [
    row => objectToDict(row, 'calcMode', LOGISTIC_FREIGHT_CALC_MODES),
  ])
}

/**
 * Transform entity
 */
export function toLogisticFreightInfo(
  template: LogisticFreightTemplateEntity,
): ILogisticFreightTemplateInfo {
  return {
    ...template,
    calcMode: toDict(template.calcMode, LOGISTIC_FREIGHT_CALC_MODES),
  }
}
