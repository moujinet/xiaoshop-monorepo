import {
  AssetType,
  type IApiPaginationData,
  type IAsset,
  type IAssetInfo,
  type IAssetUploadOptions,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取素材分页列表
 *
 * @api get /admin/assets/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationData<IAsset>>
 */
export function fetchAssetPages(
  params?: Record<string, any>,
): IUseRequestReturn<IApiPaginationData<IAsset>> {
  return useRequest<IApiPaginationData<IAsset>>({
    method: 'get',
    url: '/admin/assets/pages',
    params,
  })
}

/**
 * 获取素材详情
 *
 * @api get /admin/assets/detail
 * @param id IAsset['id']
 * @returns IUseRequestReturn<IAssetInfo>
 */
export function fetchAssetInfo(
  id: IAsset['id'],
): IUseRequestReturn<IAssetInfo> {
  return useRequest<IAssetInfo>({
    method: 'get',
    url: '/admin/assets/info',
    params: {
      id,
    },
  })
}

/**
 * 获取素材详情
 *
 * @api get /admin/assets/detail
 * @param id IAsset['id']
 * @returns IUseRequestReturn<IAsset>
 */
export function fetchAssetDetail(
  id: IAsset['id'],
): IUseRequestReturn<IAsset> {
  return useRequest<IAsset>({
    method: 'get',
    url: '/admin/assets/detail',
    params: {
      id,
    },
  })
}

interface IUploadAssetOptions {
  /**
   * 上传进度回调
   *
   * @param {number} percent
   * @param {ProgressEvent} event
   */
  onProgress: (percent: number, event?: ProgressEvent) => void
  /**
   * 上传成功回调
   *
   * @param {any} response
   */
  onSuccess: (response?: any) => void
  /**
   * 上传失败回调
   *
   * @param {any} response
   */
  onError: (response?: any) => void
}

/**
 * 上传素材
 *
 * @param {File} file
 * @param {IAssetUploadOptions} data
 */
export function uploadAsset(
  file: File,
  data: IAssetUploadOptions,
  options: IUploadAssetOptions,
) {
  const url = data.type === AssetType.IMAGE
    ? '/admin/assets/upload/image'
    : '/admin/assets/upload/video'

  return useUploadRequest<IAssetUploadOptions>({
    url,
    file,
    data,
    ...options,
  })
}

/**
 * 删除素材
 *
 * @api delete /admin/assets/delete
 * @param id IAsset['id']
 * @returns Promise<any>
 */
export function deleteAsset(id: IAsset['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/admin/assets/delete',
    data: {
      id,
    },
  })
}
