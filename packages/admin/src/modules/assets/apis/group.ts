import type { IAssetGroup, IAssetGroupRootItem, IAssetGroupTreeItem, IAssetType } from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取素材分组树
 *
 * @api get /admin/assets/group/list
 * @param type IAssetType
 * @returns IUseRequestReturn<IAssetGroupTreeItem[]>
 */
export function fetchAssetGroupTree(
  type: IAssetType,
): IUseRequestReturn<IAssetGroupTreeItem[]> {
  const { data, loading, error, refreshData } = useRequest<IAssetGroupTreeItem[]>({
    method: 'get',
    url: '/admin/assets/group/list',
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
 * @api get /admin/assets/group/root/list
 * @param type IAssetType
 * @returns IUseRequestReturn<IAssetGroupRootItem[]>
 */
export function fetchAssetGroupRoots(type: IAssetType): IUseRequestReturn<IAssetGroupRootItem[]> {
  return useRequest<IAssetGroupRootItem[]>({
    method: 'get',
    url: '/admin/assets/group/root/list',
    params: {
      type,
    },
  })
}

/**
 * 获取素材分组详情
 *
 * @api get /admin/assets/group/detail
 * @param id IAssetGroup['id']
 * @returns IUseRequestReturn<IAssetGroup>
 */
export function fetchAssetGroupDetail(id: IAssetGroup['id']): IUseRequestReturn<IAssetGroup> {
  return useRequest<IAssetGroup>({
    method: 'get',
    url: '/admin/assets/group/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建素材分组
 *
 * @api post /admin/assets/group/create
 * @param data IFormData<IAssetGroup>
 * @returns Promise<any>
 */
export function createAssetGroup(data: IFormData<IAssetGroup>): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/admin/assets/group/create',
    data,
  })
}

/**
 * 更新素材分组
 *
 * @api put /admin/assets/group/update
 * @param id IAssetGroup['id']
 * @param data IFormData<IAssetGroup>
 * @returns Promise<any>
 */
export function updateAssetGroup(id: IAssetGroup['id'], data: IFormData<IAssetGroup>): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/assets/group/update',
    params: { id },
    data,
  })
}

/**
 * 删除素材分组
 *
 * @api delete /admin/assets/group/delete
 * @param id IAssetGroup['id']
 * @returns Promise<any>
 */
export function deleteAssetGroup(id: IAssetGroup['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/admin/assets/group/delete',
    data: {
      id,
    },
  })
}
