import type {
  IGlobalOptions,
  IMenu,
  IModule,
  ISpace,
  TMenuDefinition,
  TMenuMeta,
  TMenuType,
  TModuleDefinition,
} from '~/types'

/**
 * Global contexts
 */
export const useContext = defineStore('context', () => {
  /**
   * Global options
   */
  const _options = ref<IGlobalOptions>({
    name: '',
    desc: '',
    version: '1.0.0',
    debug: false,
  })
  /**
   * All modules
   */
  const _modules = ref<IModule[]>([])
  /**
   * All menus
   */
  const _menus = ref<IMenu[]>([])
  /**
   * All menus meta
   */
  const _menusMeta = ref<TMenuMeta[]>([])

  /**
   * Get all modules
   */
  const modules = computed(() => _modules.value.sort((a, b) => a.sort - b.sort))
  /**
   * Get all menus
   */
  const menus = computed(() => _menus.value.sort((a, b) => a.sort - b.sort))
  /**
   * Get all menus meta
   */
  const menusMeta = computed(() => _menusMeta.value.sort((a, b) => a.space.length - b.space.length))

  /**
   * Create a space
   *
   * @param space ISpace
   */
  function createSpace(space: ISpace) {
    if (_menus.value.find(s => s.id === space.id))
      throw new Error(`🐤 Space "${space.id}" already exists.`)

    _menus.value.push(_normalizeMenu(
      {
        id: space.id,
        type: 'space',
        name: space.name || '空间',
        desc: space.desc || '新的空间',
        icon: space.icon || 'ph:browser',
        sort: space.sort || _menus.value.filter(m => m.type === 'space').length + 1,
        isShow: space.id !== 'global',
      },
      '',
      '',
    ))
  }

  /**
   * Create a module
   *
   * @param definition TModuleDefinition
   */
  function createModule(definition: TModuleDefinition) {
    if (_modules.value.find(m => m.id === definition.id))
      throw new Error(`🐤 Module "${definition.id}" already exists.`)

    const newModule: Omit<IModule, 'version'> = {
      id: definition.id,
      space: definition.space,
      name: definition.name || '模块',
      desc: definition.desc || '新的模块',
      icon: definition.icon || 'ph:cube',
      sort: definition.sort !== undefined
        ? definition.sort
        : modules.value.filter(m => m.space === definition.space).length + 1,
    }

    // Add module info
    _modules.value.push({
      ...newModule,
      version: definition.version || '1.0.0',
    })

    // Add module menu
    const space = _menus.value.find(m => m.id === newModule.space)
    if (!space)
      throw new Error(`🐤 Space "${definition.space}" not found.`)

    const newModuleMenu: IMenu = _normalizeMenu(
      {
        ...newModule,
        type: 'module',
        children: definition.menus,
      },
      definition.id,
      definition.space,
    )

    if (space.path === '')
      space.path = _getFirstChildPage(newModuleMenu).path

    if (!space.children)
      space.children = []

    space.children.push(newModuleMenu)
  }

  /**
   * Get breadcrumbs by menu id
   *
   * @param menuId string
   * @returns TMenuMeta[]
   */
  function getBreadcrumbs(menuId: string): TMenuMeta[] {
    const breadcrumbs: TMenuMeta[] = []
    let fullId = ''

    menuId.split('.').forEach((id) => {
      fullId = fullId ? `${fullId}.${id}` : id
      const menu = _menusMeta.value.find(m => m.id === fullId)

      if (menu)
        breadcrumbs.push(menu)
    })

    return breadcrumbs
  }

  /**
   * Get normalized menu
   *
   * @param definition TMenuDefinition
   * @param moduleId string
   * @param parentId string
   * @returns IMenu
   */
  function _normalizeMenu(
    definition: TMenuDefinition,
    moduleId: string,
    parentId: string,
  ): IMenu {
    const menuId = (parentId ? `${parentId}.${definition.id}` : definition.id)
      .replace(/\#/, '')
      .replace(/\.index$/, '')
    const menuType = definition.type || _getMenuType(definition)
    const menuPath = definition.path || menuId.includes('.') ? transId2Path(menuId) : ''

    const newMenu: IMenu = {
      id: menuId,
      space: definition.space || menuId?.split('.')[0],
      module: moduleId,
      parent: parentId,
      type: menuType,
      name: definition.name,
      desc: definition.desc || '',
      icon: definition.icon || '',
      path: menuPath,
      sort: definition.sort || _menusMeta.value.filter(m => m.module === moduleId).length + 1,
      isShow: definition.isShow === undefined ? true : definition.isShow,
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

    // Menu meta
    if (!_menusMeta.value.find(m => m.id === newMenu.id)) {
      _menusMeta.value.push({
        id: newMenu.id,
        space: newMenu.space,
        module: newMenu.module,
        type: newMenu.type,
        name: newMenu.name,
        desc: newMenu.desc,
        icon: newMenu.icon,
      })
    }

    return newMenu
  }

  /**
   * Get menu type
   *
   * @param definition TMenuDefinition
   * @returns TMenuType
   */
  function _getMenuType(definition: TMenuDefinition): TMenuType {
    if (
      definition.children
      && definition.children.filter(c => c.type === 'page').length > 0
    )
      return 'group'
    else if (definition.id === '#index')
      return 'index'
    else if (definition.id.startsWith('#'))
      return 'action'

    return 'page'
  }

  /**
   * Get first child page
   *
   * @param menu IMenu
   * @returns IMenu
   */
  function _getFirstChildPage(menu: IMenu): IMenu {
    return menu.children && menu.children.filter(m => m.type !== 'action').length > 0
      ? _getFirstChildPage(menu.children[0])
      : menu
  }

  return {
    /**
     * Get all modules
     */
    modules,
    /**
     * Get all menus
     */
    menus,
    /**
     * Get all menus meta
     */
    menusMeta,
    /**
     * Get global options
     */
    options: computed(() => _options.value),
    /**
     * Update global options
     *
     * @param userOptions IGlobalOptions
     */
    updateOptions: (userOptions: IGlobalOptions) => {
      _options.value = userOptions
    },
    /**
     * Create a space
     */
    createSpace,
    /**
     * Create a module
     */
    createModule,
    /**
     * Get breadcrumbs by menu id
     */
    getBreadcrumbs,
  }
})
