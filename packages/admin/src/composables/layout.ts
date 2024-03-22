export const useLayout = defineStore('layout', () => {
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
  function setMode(mode: 'default' | 'zen' | 'editor') {
    visible.main = ['default', 'editor'].includes(mode)
    visible.sidebar = ['default', 'editor'].includes(mode)
    visible.footer = ['default'].includes(mode)
  }

  return {
    /**
     * 可见性开关
     */
    visible,
    /**
     * 设置布局模式
     */
    setMode,
  }
})
