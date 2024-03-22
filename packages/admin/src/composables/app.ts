import type { IMenu, IModule } from '~/types'

export function useApp() {
  /**
   * 所有空间
   */
  const spaces = computed(() => {
    const { activeSpaces } = storeToRefs(useSpaces())
    return activeSpaces.value
  })

  /**
   * 获得空间下的所有模块
   *
   * @param spaceId string
   * @returns Ref<IModule[]>
   */
  function getSpaceModules(spaceId: string): Ref<IModule[]> {
    const { modules } = storeToRefs(useModules())
    return computed(() => modules.value.filter(m => m.space === spaceId))
  }

  /**
   * 获得模块下的所有菜单
   *
   * @param moduleId string
   * @returns Ref<IMenu[]>
   */
  function getModuleMenus(moduleId: string): Ref<IMenu[]> {
    const { menus } = storeToRefs(useMenus())
    return computed(() => menus.value.filter(m => m.module === moduleId))
  }

  return {
    /**
     * 所有空间
     */
    spaces,
    /**
     * 获得空间下的所有模块
     */
    getSpaceModules,
    /**
     * 获得模块下的所有菜单
     */
    getModuleMenus,
  }
}
