import type { IAssetGroup, IAssetGroupTreeNode } from '@/assets/types'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取素材分组树
 *
 * @api get /asset/group/list
 * @returns IUseRequestReturn<IAssetGroup[]>
 */
export function fetchAssetGroupTree(): IUseRequestReturn<IAssetGroupTreeNode[]> {
  const { data, loading, error, refreshData } = useRequest<IAssetGroupTreeNode[]>({
    method: 'get',
    url: '/asset/group/list',
  })

  return {
    data: computed(() => toNestedList(data.value || [], 'id', 'parentId')),
    loading,
    error,
    refreshData,
  }
}

/**
 * 获取素材分组根节点
 *
 * @api get /asset/group/roots
 * @returns IUseRequestReturn<IAssetGroup[]>
 */
export function fetchAssetGroupRoots(): IUseRequestReturn<IAssetGroup[]> {
  return useRequest<IAssetGroup[]>({
    method: 'get',
    url: '/asset/group/roots',
  })
}

/**
 * 获取素材分组详情
 *
 * @api get /asset/group/detail
 * @param id number
 * @returns IUseRequestReturn<IAssetGroup>
 */
export function fetchAssetGroupDetail(id: number): IUseRequestReturn<IAssetGroup> {
  return useRequest<IAssetGroup>({
    method: 'get',
    url: '/asset/group/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建素材分组
 *
 * @api post /asset/group/create
 * @param data Omit<IAssetGroup, 'id' | 'createdTime'>
 * @returns Promise<any>
 */
export function createAssetGroup(data: Omit<IAssetGroup, 'id' | 'createdTime'>): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/asset/group/create',
    data,
  })
}

/**
 * 更新素材分组
 *
 * @api put /asset/group/update
 * @param data Omit<IAssetGroup, 'createdTime'>
 * @returns Promise<any>
 */
export function updateAssetGroup(data: Omit<IAssetGroup, 'createdTime'>): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/asset/group/update',
    data,
  })
}

/**
 * 删除素材分组
 *
 * @api delete /asset/group/delete
 * @param id number
 * @returns Promise<any>
 */
export function deleteAssetGroup(id: number): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/asset/group/delete',
    params: {
      id,
    },
  })
}
