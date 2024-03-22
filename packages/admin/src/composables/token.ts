import { useStorage } from '@vueuse/core'

export function useToken() {
  /**
   * Token
   */
  const token = useStorage('token', '', sessionStorage)

  /**
   * 更新 token
   *
   * @param newToken string
   */
  function updateToken(newToken: string) {
    token.value = newToken
  }

  return {
    /**
     * 获取 token
     */
    token: computed(() => token.value),
    /**
     * 更新 token
     */
    updateToken,
  }
}
