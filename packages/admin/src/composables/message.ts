import {
  DEFAULT_MESSAGE_DURATION,
  DEFAULT_MESSAGE_ID,
} from '~/constants/defaults'

export interface IUseMessageOptions {
  id?: string
  duration?: number
  showIcon?: boolean
  closable?: boolean
  onClose?: () => void
}

export function useMessage(options?: IUseMessageOptions) {
  const {
    id = DEFAULT_MESSAGE_ID,
    duration = DEFAULT_MESSAGE_DURATION,
    showIcon = true,
    closable = true,
    onClose,
  } = options || {}

  return {
    /**
     * 显示成功消息
     *
     * @param content string
     */
    success: (content: string) => {
      AMessage.success({ id, content, duration, closable, showIcon, resetOnHover: true, onClose })
    },
    /**
     * 显示警告消息
     *
     * @param content string
     */
    warning: (content: string) => {
      AMessage.warning({ id, content, duration, closable, showIcon, resetOnHover: true, onClose })
    },
    /**
     * 显示错误消息
     *
     * @param content string
     */
    error: (content: string) => {
      AMessage.error({ id, content, duration, closable, showIcon, resetOnHover: true, onClose })
    },
    /**
     * 显示加载中
     *
     * @param content string
     */
    loading: (content: string = '加载中...') => {
      AMessage.loading({ id, content, duration, closable: false, showIcon, onClose })
    },
  }
}
