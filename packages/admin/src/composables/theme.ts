type LayoutMode = 'default' | 'zen'

type LayoutPanel = 'main' | 'sidebar' | 'footer'

export const useTheme = defineStore('theme', () => {
  /**
   * 主题
   */
  const [theme] = useCache('theme', 'default')

  /**
   * 可见性开关
   */
  const visible = reactive<Record<LayoutPanel, boolean>>({
    main: true,
    sidebar: true,
    footer: true,
  })

  /**
   * 设置可见性
   *
   * @param panel LayoutPanel
   * @param val boolean
   */
  function setVisible(panel: LayoutPanel, val: boolean) {
    visible[panel] = val
  }

  /**
   * 设置可见性，离开页面时自动恢复
   *
   * @param panel LayoutPanel
   * @param val boolean
   */
  function setAutoVisible(panel: LayoutPanel, val: boolean) {
    visible[panel] = val

    onBeforeRouteLeave(() => {
      visible[panel] = !val
    })
  }

  /**
   * 设置布局模式
   *
   * @param mode LayoutMode
   */
  function setLayoutMode(mode: LayoutMode) {
    visible.main = ['default'].includes(mode)
    visible.sidebar = ['default'].includes(mode)
    visible.footer = ['default'].includes(mode)
  }

  /**
   * 切换布局模式，并可离开页面后还原
   *
   * @param use LayoutMode
   * @param beforeLeave LayoutMode | undefined
   */
  function swapLayoutMode(use: LayoutMode, beforeLeave?: LayoutMode) {
    setLayoutMode(use)

    if (beforeLeave) {
      onBeforeRouteLeave(() => {
        setLayoutMode(beforeLeave)
      })
    }
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
     * 设置可见性
     */
    setVisible,
    /**
     * 设置可见性，离开页面时自动恢复
     */
    setAutoVisible,
    /**
     * 设置布局模式
     */
    setLayoutMode,
    /**
     * 切换布局模式
     */
    swapLayoutMode,
    /**
     * 设置主题
     */
    changeTheme,
  }
})
