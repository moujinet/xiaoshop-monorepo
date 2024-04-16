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
 * @returns Promise<IApiSettingsItem[]>
 */
export function getSettings(): Promise<IApiSettingsItem[]> {
  return usePromiseRequest<IApiSettingsItem[]>({
    method: 'get',
    url: '/settings',
  })
}

/**
 * 获取指定前缀设置
 *
 * @returns Promise<IApiSettingsItem[]>
 */
export function getSettingsByPrefix(prefix: string): Promise<IApiSettingsItem[]> {
  return usePromiseRequest<IApiSettingsItem[]>({
    method: 'get',
    url: '/settings',
    params: { prefix },
  })
}

/**
 * 更新设置
 *
 * @param settings IKeyValue
 */
export function doUpdateSettings(settings: IKeyValue) {
  return useRequest<void>({
    method: 'put',
    url: '/settings/update',
    data: settings,
  })
}
