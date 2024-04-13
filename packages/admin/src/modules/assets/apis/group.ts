import type { IAssetGroup, IAssetGroupTreeNode, IAssetGroupType } from '@/assets/types'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取素材分组树
 *
 * @api get /asset/group/list
 * @param type IAssetGroupType
 * @returns IUseRequestReturn<IAssetGroup[]>
 */
export function fetchAssetGroupTree(type: IAssetGroupType): IUseRequestReturn<IAssetGroupTreeNode[]> {
  const { data, loading, error, refreshData } = useRequest<IAssetGroupTreeNode[]>({
    method: 'get',
    url: '/asset/group/list',
    params: {
      type,
    },
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
 * @param type IAssetGroupType
 * @returns IUseRequestReturn<IAssetGroup[]>
 */
export function fetchAssetGroupRoots(type: IAssetGroupType): IUseRequestReturn<IAssetGroup[]> {
  return useRequest<IAssetGroup[]>({
    method: 'get',
    url: '/asset/group/roots',
    params: {
      type,
    },
  })
}

/**
 * 获取素材分组详情
 *
 * @api get /asset/group/detail
 * @param id IAssetGroup['id']
 * @returns IUseRequestReturn<IAssetGroup>
 */
export function fetchAssetGroupDetail(id: IAssetGroup['id']): IUseRequestReturn<IAssetGroup> {
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
 * @param id IAssetGroup['id']
 * @param data Omit<IAssetGroup, 'id' | 'createdTime'>
 * @returns Promise<any>
 */
export function updateAssetGroup(id: IAssetGroup['id'], data: Omit<IAssetGroup, 'id' | 'createdTime'>): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/asset/group/update',
    params: { id },
    data,
  })
}

/**
 * 删除素材分组
 *
 * @api delete /asset/group/delete
 * @param id IAssetGroup['id']
 * @returns Promise<any>
 */
export function deleteAssetGroup(id: IAssetGroup['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/asset/group/delete',
    data: {
      id,
    },
  })
}
