import type { ISystemUserDict, ISystemUserPublicInfo } from '@/system'

/**
 * 通知订阅者信息 - 商家
 */
export type INotificationSellerSubscriber = ISystemUserPublicInfo

/**
 * 通知订阅者字典信息 - 商家
 */
export type INotificationSellerSubscriberDict = ISystemUserDict

/**
 * 通知订阅者信息 - 买家
 */
export interface INotificationBuyerSubscriber {}
