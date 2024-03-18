import type { IMenu } from '~/types'

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

  const { menus } = storeToRefs(useContext())

  /**
   * Get top menus
   */
  const spaces = computed(() => menus.value.filter(m => m.type === 'space' && m.isShow))

  /**
   * Get modules by space id
   *
   * @param space string
   * @returns IMenu[]
   */
  function getModules(space: string): IMenu[] {
    return menus.value
      .find(m => m.space === space)
      ?.children || []
  }

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
    spaces,
    visible,
    toggleVisible,
    getModules,
  }
})
