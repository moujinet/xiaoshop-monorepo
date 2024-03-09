import type {
  IGlobalOptions,
  IMenu,
  IModule,
  ISpace,
  TMenuDefinition,
  TMenuType,
  TModuleDefinition,
} from '~/types'

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
   * All menus
   */
  const _menus = ref<IMenu[]>([])
  /**
   * Nested menu
   *
   * - key: spaceId
   * - value: modules
   */
  const _nestedMenus = ref<Record<string, IMenu[]>>({})
  /**
   * All modules
   */
  const _modules = ref<IModule[]>([])

  /**
   * All spaces
   */
  const spaces = computed(() => _menus.value.filter(m => m.type === 'space').sort((a, b) => a.sort - b.sort))
  /**
   * All modules
   */
  const modules = computed(() => _modules.value.sort((a, b) => a.sort - b.sort))
  /**
   * All menus (sorted by length)
   */
  const menus = computed(() => _menus.value.sort((a, b) => a.sort - b.sort))
  /**
   * All nested menus
   */
  const nestedMenus = computed(() => {
    if (Object.values(_nestedMenus.value).length === 0) {
      spaces.value.forEach((space) => {
        _nestedMenus.value[space.id] = getNestedMenu(space.id)
      })
    }

    return Object.values(_nestedMenus.value).flat()
  })

  /**
   * Get all menus with the condition
   *
   * @param condition
   * @returns IMenu[]
   */
  function getMenu(condition?: (m: IMenu) => boolean): IMenu[] {
    return _menus.value.filter(condition || (() => true))
  }

  /**
   * Get nested menu
   *
   * @param spaceId string
   * @returns IMenu[]
   */
  function getNestedMenu(spaceId: string): IMenu[] {
    const space = spaces.value.find(s => s.id === spaceId)
    if (!space)
      throw new Error(`🐤 Space "${spaceId}" not found.`)

    if (!_nestedMenus.value[spaceId]) {
      const __menus: IMenu[] = []
      const spaceMenus = menus.value.filter(m => m.space === spaceId)

      // modules
      spaceMenus
        .filter(m => m.type === 'module')
        .forEach((m) => {
          const module = { ...m } as IMenu

          // groups
          spaceMenus
            .filter(m => m.type === 'group')
            .forEach((g) => {
              const group = { ...g } as IMenu

              // pages
              spaceMenus
                .filter(m => m.id.startsWith(g.id) && m.type === 'page')
                .forEach((p, idx) => {
                  const page = { ...p } as IMenu

                  if (space.path === '' && idx === 0)
                    space.path = page.path

                  group.children = group.children || []
                  group.children.push(page)
                })

              module.children = module.children || []
              module.children.push(group)
            })

          __menus.push(module)
        })

      _nestedMenus.value[spaceId] = __menus
    }

    return _nestedMenus.value[spaceId] || []
  }

  /**
   * Whether the menu exists
   *
   * @param id string
   * @param type TMenuType
   * @returns boolean
   */
  function hasMenu(id: string, type: TMenuType): boolean {
    return getMenu(m => m.id === id && m.type === type).length > 0
  }

  /**
   * Create a space
   *
   * @param space ISpace
   */
  function createSpace(space: ISpace) {
    if (spaces.value.find(s => s.id === space.id))
      throw new Error(`🐤 Space "${space.id}" already exists.`)

    const newSpace: TMenuDefinition = {
      id: space.id || 'default',
      type: 'space',
      name: space.name || '空间',
      desc: space.desc || '新的空间',
      icon: space.icon || 'ph:browser',
      sort: space.sort || spaces.value.length,
    }

    _createMenu(newSpace, space.id)
  }

  /**
   * Create a module
   *
   * @param definition TModuleDefinition
   */
  function createModule(definition: TModuleDefinition) {
    if (modules.value.find(m => m.id === definition.id))
      throw new Error(`🐤 Module "${definition.id}" already exists.`)

    const newModule: Omit<IModule, 'version'> = {
      id: definition.id,
      space: definition.space,
      name: definition.name || '模块',
      desc: definition.desc || '新的模块',
      icon: definition.icon || 'ph:cube',
      sort: definition.sort || modules.value.filter(m => m.space === definition.space).length,
    }
    _modules.value.push({
      ...newModule,
      version: definition.version || '1.0.0',
    })

    const newModuleMenu: TMenuDefinition = {
      ...newModule,
      type: 'module',
      children: definition.menus,
    }

    _createMenu(newModuleMenu, definition.id)
  }

  /**
   * Create a menu
   *
   * @param definition TMenuDefinition
   * @param moduleId string
   * @param parentId string
   */
  function _createMenu(
    definition: TMenuDefinition,
    moduleId: string,
    parentId?: string,
  ) {
    const menuId = parentId ? `${parentId}.${definition.id}` : definition.id
    const menuType = definition.type || _getMenuType(definition)
    const newMenu = _normalizeMenu(menuId, moduleId, definition)

    if (definition.children && definition.children.length > 0)
      definition.children.forEach(child => _createMenu(child, moduleId, menuId))

    if (!hasMenu(menuId, menuType))
      _menus.value.push(newMenu)
  }

  /**
   * Normalize menu
   *
   * @param menuId string
   * @param moduleId string
   * @param definition TMenuDefinition
   * @returns IMenu
   */
  function _normalizeMenu(menuId: string, moduleId: string, definition: TMenuDefinition): IMenu {
    const menuType = definition.type || _getMenuType(definition)
    const menuPath = definition.path || menuId.includes('.') ? transId2Path(menuId) : ''

    const newMenu: IMenu = {
      id: menuId,
      space: definition.space || moduleId.split('.')[0],
      module: moduleId,
      type: menuType,
      name: definition.name,
      icon: definition.icon || '',
      desc: definition.desc || '',
      path: menuPath,
      sort: definition.sort || 0,
      isShow: definition.isShow === undefined ? true : definition.isShow,
      isPermission: definition.isPermission === undefined ? true : definition.isPermission,
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
    if (definition.children && definition.children.length > 0)
      return 'group'
    else if (definition.path?.startsWith('#'))
      return 'action'

    return 'page'
  }

  return {
    spaces,
    modules,
    menus,
    nestedMenus,
    options: computed(() => _options.value),
    updateOptions: (userOptions: IGlobalOptions) => {
      _options.value = userOptions
    },
    hasMenu,
    getMenu,
    getNestedMenu,
    createSpace,
    createModule,
  }
})
