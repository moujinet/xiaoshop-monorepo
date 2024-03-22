import type { ISpace } from '~/types'
import { DEFAULT_SPACES } from '~/constants/defaults'

export const useSpaces = defineStore('spaces', () => {
  /**
   * 是否已初始化
   */
  const _initd = ref(false)
  /**
   * 所有空间 (内部)
   */
  const _spaces = ref<Record<string, ISpace>>({})

  /**
   * 返回已排序的空间
   */
  const spaces = computed(() => Object.values(_spaces.value).sort((a, b) => a.sort - b.sort))

  /**
   * 返回指定空间
   *
   * @param id string
   * @returns ISpace | undefined
   */
  function getSpace(id: string): ISpace | undefined {
    return _spaces.value[id] || undefined
  }

  /**
   * 判断空间是否存在
   *
   * @param id string
   * @returns boolean
   */
  function hasSpace(id: string): boolean {
    return Object.keys(_spaces.value).includes(id)
  }

  /**
   * 创建空间
   *
   * @param definition Partial<ISpace>
   */
  function createSpace(definition: Partial<ISpace>) {
    if (!definition.id)
      throw new Error('[XiaoShop] Space "id" is required')
    if (!definition.name)
      throw new Error('[XiaoShop] Space "name" is required')
    if (!definition.icon)
      throw new Error('[XiaoShop] Space "icon" is required')

    if (hasSpace(definition.id))
      throw new Error(`[XiaoShop] Space "${definition.id}" already exists`)

    const newSpace: ISpace = {
      id: definition.id,
      name: definition.name,
      icon: definition.icon,
      desc: definition.desc || '',
      path: definition.path || '',
      sort: definition.sort || spaces.value.length + 1,
      isShow: definition.isShow !== undefined ? definition.isShow : true,
    }

    // add new space
    _spaces.value[newSpace.id] = newSpace
  }

  /**
   * 更新空间访问路径
   *
   * @param spaceId string
   * @param path string
   */
  function updateSpacePath(spaceId: string, path: string) {
    const space = Object.values(_spaces.value).find(s => s.id === spaceId)

    if (space && !space.path)
      space.path = path
  }

  /**
   * 初始化默认空间
   */
  if (!_initd.value) {
    DEFAULT_SPACES.forEach((space) => {
      createSpace(space)
    })

    // init
    _initd.value = true
  }

  return {
    /**
     * 所有空间
     */
    spaces,
    /**
     * 已激活的空间
     */
    activeSpaces: computed(() => spaces.value.filter(space => space.isShow)),
    /**
     * 判断空间是否存在
     */
    hasSpace,
    /**
     * 返回指定空间
     */
    getSpace,
    /**
     * 创建空间
     */
    createSpace,
    /**
     * 更新空间访问路径
     */
    updateSpacePath,
  }
})
