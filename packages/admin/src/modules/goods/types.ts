export enum GoodsFormStepEnum {
  BASIC = 1,
  INVENTORY = 2,
  DETAIL = 3,
  PUBLISH = 4,
}

export type IGoodsFormStepStep = typeof GoodsFormStepEnum[keyof typeof GoodsFormStepEnum]

export interface IGoodsFormStep {
  step: IGoodsFormStepStep
  key: string
  name: string
}
