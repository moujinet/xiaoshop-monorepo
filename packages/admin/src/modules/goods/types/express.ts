export interface IExpressCompany {
  id: number
  name: string
  url: string
  sort: number
  createdTime: number
}

export type IExpressCompanyDict = ToDictionary<IExpressCompany>

export interface IExpressTemplate {
  id: number
  name: string
  chargeMode: string
  areas: string
  isDefault: number
  enableFreeShip: number
  createdTime: number
}

export interface IExpressPostman {
  id: number
  name: string
  phoneNumber: string
  sort: number
  createdTime: number
}
