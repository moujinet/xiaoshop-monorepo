interface ILayoutVisible {
  sider: boolean
  mainMenu: boolean
  subMenu: boolean
  footer: boolean
}

export const useLayout = defineStore('layout', () => {
  const visible = reactive<ILayoutVisible>({
    sider: true,
    mainMenu: true,
    subMenu: true,
    footer: true,
  })

  /**
   * Toggle visible
   *
   * @param type string
   * @param value boolean
   * @param toggleWhenRouteLeave boolean
   */
  function toggleVisible(type: keyof ILayoutVisible, value: boolean, toggleWhenRouteLeave = false) {
    visible[type] = value

    onBeforeRouteLeave(() => {
      if (toggleWhenRouteLeave)
        visible[type] = !value
    })
  }

  return {
    visible,
    toggleVisible,
  }
})
