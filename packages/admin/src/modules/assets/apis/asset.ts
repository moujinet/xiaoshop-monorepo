import { AssetTypeEnum, type IAsset, type IAssetInfo, type IAssetUploadOptions } from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取素材分页列表
 *
 * @api get /assets/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationResult<IAsset>>
 */
export function fetchAssetPages(params?: Record<string, any>): IUseRequestReturn<IApiPaginationResult<IAsset>> {
  return useRequest<IApiPaginationResult<IAsset>>({
    method: 'get',
    url: '/assets/pages',
    params,
  })
}

/**
 * 获取素材详情
 *
 * @api get /assets/detail
 * @param id IAsset['id']
 * @returns IUseRequestReturn<IAssetInfo>
 */
export function fetchAssetInfo(id: IAsset['id']): IUseRequestReturn<IAssetInfo> {
  return useRequest<IAssetInfo>({
    method: 'get',
    url: '/assets/info',
    params: {
      id,
    },
  })
}

/**
 * 获取素材详情
 *
 * @api get /assets/detail
 * @param id IAsset['id']
 * @returns IUseRequestReturn<IAsset>
 */
export function fetchAssetDetail(id: IAsset['id']): IUseRequestReturn<IAsset> {
  return useRequest<IAsset>({
    method: 'get',
    url: '/assets/detail',
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
  const url = [AssetTypeEnum.IMAGE, AssetTypeEnum.ICON].includes(data.type)
    ? '/assets/upload/image'
    : '/assets/upload/video'

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
 * @api delete /assets/delete
 * @param id IAsset['id']
 * @returns Promise<any>
 */
export function deleteAsset(id: IAsset['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/assets/delete',
    data: {
      id,
    },
  })
}
