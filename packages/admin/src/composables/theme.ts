export const useTheme = defineStore('theme', () => {
  /**
   * 主题
   */
  const [theme] = useCache('theme', 'default')

  /**
   * 可见性开关
   */
  const visible = reactive({
    main: true,
    sidebar: true,
    footer: true,
  })

  /**
   * 设置布局模式
   *
   * @param mode 'zen' | 'default' | 'editor'
   */
  function setLayoutMode(mode: 'default' | 'zen' | 'editor') {
    visible.main = ['default', 'editor'].includes(mode)
    visible.sidebar = ['default', 'editor'].includes(mode)
    visible.footer = ['default'].includes(mode)
  }

  /**
   *  设置主题
   */
  function changeTheme() {
    document.documentElement.setAttribute('data-theme', theme.value || 'default')
  }

  return {
    theme,
    /**
     * 可见性开关
     */
    visible,
    /**
     * 设置布局模式
     */
    setLayoutMode,
    /**
     * 设置主题
     */
    changeTheme,
  }
})
