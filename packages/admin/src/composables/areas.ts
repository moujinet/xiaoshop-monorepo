import {
  type IApiAreaListItem,
  fetchAreaList,
} from '@/settings/apis/area'

export const useAreas = defineStore('area', () => {
  /**
   * 地区集合
   */
  const areas = ref<IApiAreaListItem[]>([])

  /**
   * 获取指定地区下的所有地区
   *
   * @param parent number
   * @returns IApiAreaListItem[]
   */
  async function getAreaListByParent(parent: number = 0): Promise<IApiAreaListItem[]> {
    if (!_hasAreasInParent(parent)) {
      const items = await fetchAreaList(parent)
      items.map(area => areas.value.push(area))
    }

    return new Promise(resolve => resolve(
      areas.value.filter(a => a.parent === parent),
    ))
  }

  /**
   * 检查指定地区是否存在
   *
   * @param parent number
   * @returns boolean
   */
  function _hasAreasInParent(parent: number) {
    return areas.value.some(a => a.parent === parent)
  }

  return {
    /**
     * 获取指定地区下的所有地区
     */
    getAreaListByParent,
  }
})
