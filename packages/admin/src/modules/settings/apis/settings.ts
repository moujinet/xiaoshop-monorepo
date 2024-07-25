import type { ISettings, ISettingsOption } from '@xiaoshop/schema'
/**
 * 获取所有设置
 *
 * @apis get /settings/list
 * @returns Promise<ISettings[]>
 */
export function getSettings(): Promise<ISettings[]> {
  return usePromiseRequest<ISettings[]>({
    method: 'get',
    url: '/settings/list',
  })
}

/**
 * 更新设置
 *
 * @apis put /settings/update
 * @param settings ISettingsOption
 * @returns Promise<any>
 */
export function updateSettings(settings: ISettingsOption[]): Promise<any> {
  return usePromiseRequest<any>({
    method: 'put',
    url: '/settings/update',
    data: settings,
  })
}
