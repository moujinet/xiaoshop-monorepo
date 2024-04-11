import type { RenderContent } from '@arco-design/web-vue/es/_utils/types'
import type { NotificationPosition } from '@arco-design/web-vue/es/notification/interface'
import type { IUseMessageOptions } from './message'
import { DEFAULT_MESSAGE_DURATION, DEFAULT_MESSAGE_ID } from '~/constants/defaults'

export type IUseNotificationOptions = IUseMessageOptions & {
  position: NotificationPosition
}

export interface IUseNotificationUserConfig {
  title?: RenderContent
  content: RenderContent
}

export function useNotification(options?: IUseNotificationOptions) {
  const {
    id = DEFAULT_MESSAGE_ID,
    duration = DEFAULT_MESSAGE_DURATION,
    showIcon = true,
    closable = true,
    position = 'bottomRight',
    onClose,
  } = options || {}

  function _getConfig(config: IUseNotificationUserConfig | RenderContent) {
    if (typeof config === 'string')
      config = { content: config }

    if (typeof config === 'function')
      config = { content: config }

    return config
  }

  return {
    /**
     * 显示信息提醒框
     *
     * @param config IUseNotificationUserConfig | RenderContent
     */
    info: (config: IUseNotificationUserConfig | RenderContent) => {
      const { title, content } = _getConfig(config)
      ANotification.info({ id, title, content, duration, closable, showIcon, position, onClose })
    },
    /**
     * 显示成功提醒框
     *
     * @param config IUseNotificationUserConfig | RenderContent
     */
    success: (config: IUseNotificationUserConfig | RenderContent) => {
      const { title, content } = _getConfig(config)
      ANotification.success({ id, title, content, duration, closable, showIcon, position, onClose })
    },
    /**
     * 显示警告提醒框
     *
     * @param config IUseNotificationUserConfig | RenderContent
     */
    warning: (config: IUseNotificationUserConfig | RenderContent) => {
      const { title, content } = _getConfig(config)
      ANotification.warning({ id, title, content, duration, closable, showIcon, position, onClose })
    },
    /**
     * 显示错误提醒框
     *
     * @param config IUseNotificationUserConfig | RenderContent
     */
    error: (config: IUseNotificationUserConfig | RenderContent) => {
      const { title, content } = _getConfig(config)
      ANotification.error({ id, title, content, duration, closable, showIcon, position, onClose })
    },
  }
}
