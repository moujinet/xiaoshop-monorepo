import { AppEvent } from '~/common/events'

/**
 * 地址创建事件
 */
export class LogisticAddressCreateEvent extends AppEvent {}

/**
 * 地址更新事件
 */
export class LogisticAddressUpdateEvent extends AppEvent {}

/**
 * 设置默认地址事件
 */
export class LogisticAddressDefaultUpdateEvent extends AppEvent {}

/**
 * 地址删除事件
 */
export class LogisticAddressDeleteEvent extends AppEvent {}
