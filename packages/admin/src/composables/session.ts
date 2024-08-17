import type { IStaffLoginProfile, IStaffLoginToken } from '@xiaoshop/schema'

interface IUseSessionReturns {
  /**
   * 是否登录
   */
  isLogin: ComputedRef<boolean>
  /**
   * 登录口令
   */
  token: ComputedRef<string | undefined>
  /**
   * 登录用户信息
   */
  profile: ComputedRef<IStaffLoginProfile | undefined>
  /**
   * 登录操作
   *
   * @param username 用户名
   * @param password 用户密码
   */
  login: (username: string, password: string) => Promise<void>
  /**
   * 退出登录
   */
  logout: () => Promise<void>
}

/**
 * 当前会话
 *
 * - isLogin: 是否登录
 * - token: 登录口令
 * - profile: 登录用户信息
 * - login: 登录操作
 * - logout: 退出登录
 *
 * @see {@link IUseSessionReturns}
 */
export function useSession(): IUseSessionReturns {
  const [token, setToken] = useCache<string>('token', '')
  const [profile, setProfile] = useCache<IStaffLoginProfile>('profile', {} as IStaffLoginProfile)

  async function loginUser(username: string, password: string) {
    return usePromiseRequest<IStaffLoginToken>({
      method: 'post',
      url: '/admin/auth/staff/login',
      data: {
        username,
        password,
      },
    })
  }

  async function getProfile() {
    return usePromiseRequest<IStaffLoginProfile>({
      method: 'get',
      url: '/admin/auth/staff/profile',
    })
  }

  return {
    /**
     * 是否登录
     */
    isLogin: computed(() => !!token.value),
    /**
     * 登录口令
     */
    token: computed(() => token.value),
    /**
     * 登录用户信息
     */
    profile: computed(() => profile.value),
    /**
     * 登录操作
     *
     * @param username 用户名
     * @param password 用户密码
     */
    login: async (username: string, password: string) => {
      return new Promise((resolve, reject) => {
        loginUser(username, password).then((res) => {
          if (res.token) {
            setToken(res.token)

            getProfile().then((profile) => {
              setProfile(profile)
              resolve()
            })
          }
          else {
            reject(new Error('登录失败'))
          }
        })
      })
    },
    /**
     * 退出登录
     */
    logout: async () => {
      setToken('')
      setProfile({} as IStaffLoginProfile)
    },
  }
}
