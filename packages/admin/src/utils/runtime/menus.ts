import type { IMenu, IMenuDefinition, IMenuType } from '~/types'

export const useMenus = defineStore('menu', () => {
  /**
   * 已注册菜单 (内部)
   */
  const _menus: Ref<IMenu[]> = ref([])

  /**
   * 返回已排序的菜单
   */
  const menus = computed(() => _menus.value.sort((a, b) => a.sort - b.sort))

  /**
   * 创建模块菜单
   *
   * @param moduleId string
   * @param userMenus IMenuDefinition[]
   */
  function createModuleMenus(moduleId: string, userMenus: IMenuDefinition[]) {
    const _: IMenu[] = []

    if (!userMenus || useMenus.length === 0)
      return

    userMenus
      .sort((a, b) => (a.sort || 0) - (b.sort || 0))
      .forEach((menu) => {
        _.push(_normalizeMenu(menu, moduleId, moduleId))
      })

    if (_.length > 0) {
      const { updateModulePath } = useModules()
      const firstMenu = _.sort((a, b) => a.sort - b.sort)[0]
      updateModulePath(moduleId, _getFirstChildMenu(firstMenu).path)
    }

    _.map(m => _menus.value.push(m))
  }

  /**
   * 返回标准化菜单
   *
   * @param definition IMenuDefinition
   * @param moduleId string
   * @param parentId string
   * @returns IMenu
   */
  function _normalizeMenu(
    definition: IMenuDefinition,
    moduleId: string,
    parentId: string,
  ): IMenu {
    const menuId = normalizeMenuId(parentId ? `${parentId}.${definition.id}` : definition.id)
    const menuType = definition.type || _getMenuType(definition)
    const menuPath = definition.path || _getMenuPath(definition, menuId)

    const newMenu: IMenu = {
      id: menuId,
      parent: parentId || moduleId,
      space: moduleId.split('.')[0],
      module: moduleId,
      type: menuType,
      name: definition.name,
      desc: definition.desc || '',
      icon: definition.icon || '',
      path: menuPath,
      sort: definition.sort || 1,
      isShow: definition.isShow !== undefined ? definition.isShow : true,
    }

    if (definition.children && definition.children.length > 0) {
      definition.children
        .sort((a, b) => (a.sort || 0) - (b.sort || 0))
        .forEach((child) => {
          if (!newMenu.children)
            newMenu.children = []

          newMenu.children.push(_normalizeMenu(child, moduleId, menuId))
        })
    }

    return newMenu
  }

  /**
   * 返回菜单类型
   *
   * @param definition IMenuDefinition
   * @returns string
   */
  function _getMenuType(definition: IMenuDefinition): IMenuType {
    if (definition.id === 'index') {
      return 'index'
    }
    else if (definition.id.startsWith('#')) {
      return 'action'
    }
    else if (definition.children && definition.children.length > 0) {
      if (definition.children.some(c => c.id === 'index'))
        return 'page'

      if (definition.children.filter(c => c.id.startsWith('#')).length === definition.children.length)
        return 'page'

      return 'group'
    }

    return 'page'
  }

  /**
   * 返回菜单路径
   *
   * @param definition IMenuDefinition
   * @param menuId string
   * @returns string
   */
  function _getMenuPath(definition: IMenuDefinition, menuId: string): string {
    if (definition.path)
      return definition.path

    return menuId.includes('.') ? transId2Path(menuId) : ''
  }

  /**
   * 返回默认子菜单
   *
   * @param menu IMenu
   * @returns IMenu
   */
  function _getFirstChildMenu(menu: IMenu): IMenu {
    if (!menu.children || menu.children.length === 0)
      return menu

    return menu.children.some(m => m.type === 'page' || m.type === 'index')
      ? _getFirstChildMenu(menu.children
        .filter(m => m.type === 'page' || m.type === 'index')
        .sort(a => a.type === 'index' ? -1 : 1)[0],
      )
      : menu
  }

  return {
    /**
     * 所有菜单
     */
    menus,
    /**
     * 创建模块菜单
     */
    createModuleMenus,
  }
})
