import type { IMenu, IModule } from '~/types'
import { DEFAULT_VERSION } from '~/constants/defaults'

export function useApp() {
  const [version, setVersion] = useCache<string>(
    'version',
    DEFAULT_VERSION,
    {
      expire: 0,
    },
  )

  /**
   * 所有空间
   */
  const spaces = computed(() => {
    const { activeSpaces } = storeToRefs(useSpaces())
    return activeSpaces.value
  })

  /**
   * 所有模块
   */
  const modules = computed(() => {
    const { modules } = storeToRefs(useModules())
    return modules.value
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
     * 版本
     */
    version,
    /**
     * 所有空间
     */
    spaces,
    /**
     * 所有模块
     */
    modules,
    /**
     * 设置版本
     */
    setVersion,
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
