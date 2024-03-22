import type { IGlobalContext } from './global'

export interface ICallback<T = void> {
  (): T
}

export type IAsyncCallback<T = void> = Promise<T>

export interface IContextCallback<T = void> {
  (ctx: IGlobalContext): T
}
