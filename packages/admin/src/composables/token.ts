export function useToken() {
  /**
   * Token
   *
   * TODO: refresh token
   */
  const [token, updateToken] = useCache('token', '')

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
