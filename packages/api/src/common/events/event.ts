export type IBaseEventSource = 'system' | 'admin' | 'member'

export interface IBaseEvent {
  readonly module: string
  readonly source: IBaseEventSource
}
