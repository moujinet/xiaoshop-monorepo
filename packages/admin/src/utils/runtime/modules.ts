import type {
  IModule,
  IModuleDefinition,
  IModuleInstaller,
} from '~/types'
import { DEFAULT_VERSION } from '~/constants/defaults'

export const useModules = defineStore('module', () => {
  /**
   * 模块 (内部)
   */
  const _modules = ref<IModule[]>([])

  /**
   * 返回已排序的模块
   */
  const modules = computed(() => _modules.value.sort((a, b) => a.sort - b.sort))

  /**
   * 创建模块
   *
   * @param definition IModuleDefinition
   */
  function createModule(definition: IModuleDefinition) {
    if (!useSpaces().hasSpace(definition.space))
      throw new Error(`[XiaoShop] Module "${definition.id}" can not be created, Because Space "${definition.space}" not found`)

    const newModule: IModule = {
      id: `${definition.space}.${definition.id}`,
      space: definition.space,
      name: definition.name,
      desc: definition.desc || '',
      icon: definition.icon || '',
      path: definition.path || '',
      version: definition.version || DEFAULT_VERSION,
      sort: definition.sort || _modules.value.length + 1,
    }

    if (_hasModule(newModule.id))
      throw new Error(`[XiaoShop] Module "${newModule.id}" already exists`)

    _modules.value.push(newModule)

    // 创建模块菜单
    useMenus().createModuleMenus(newModule.id, definition.menus || [])
  }

  /**
   * 更新模块访问路径
   *
   * @param moduleId string
   * @param path string
   */
  function updateModulePath(moduleId: string, path: string) {
    const module = _modules.value.find(m => m.id === moduleId)

    if (module) {
      const { updateSpacePath } = useSpaces()

      module.path = path
      updateSpacePath(module.space, path)
    }
  }

  /**
   * 判断是否存在指定模块
   *
   * @param id string
   * @returns boolean
   */
  function _hasModule(id: string) {
    return _modules.value.some(m => m.id === id)
  }

  return {
    /**
     * 所有模块
     */
    modules,
    /**
     * 创建模块
     */
    createModule,
    /**
     * 更新模块访问路径
     */
    updateModulePath,
  }
})

/**
 * 定义模块
 *
 * @param definition IModuleDefinition
 * @returns IModuleInstaller
 */
export function defineModule(definition: IModuleDefinition): IModuleInstaller {
  if (!definition.id)
    throw new Error('[XiaoShop] Module "id" is required.')

  if (!definition.space)
    throw new Error('[XiaoShop] Module "space" is required.')

  if (!definition.name)
    throw new Error('[XiaoShop] Module "name" is required.')

  return () => {
    useModules().createModule(definition)

    if (definition.setup)
      definition.setup()
  }
}

/**
 * 加载所有模块
 */
export function loadModules() {
  Object.values(import.meta.glob<IModuleInstaller>('~/modules/**/install.ts', {
    eager: true,
    import: 'default',
  }),
  ).forEach(module => module())
}
