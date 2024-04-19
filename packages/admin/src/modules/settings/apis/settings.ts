export interface IApiSettingsItem {
  /**
   * 设置 ID
   */
  id: number
  /**
   * 设置键
   */
  key: string
  /**
   * 设置值
   */
  value: string
}

/**
 * 获取所有设置
 *
 * @apis get /settings/list
 * @returns Promise<IApiSettingsItem[]>
 */
export function getSettings(): Promise<IApiSettingsItem[]> {
  return usePromiseRequest<IApiSettingsItem[]>({
    method: 'get',
    url: '/settings',
  })
}

/**
 * 更新设置
 *
 * @apis put /settings/update
 * @param settings IKeyValue
 * @returns Promise<any>
 */
export function updateSettings(settings: IKeyValue): Promise<any> {
  return usePromiseRequest<void>({
    method: 'put',
    url: '/settings/update',
    data: settings,
  })
}
