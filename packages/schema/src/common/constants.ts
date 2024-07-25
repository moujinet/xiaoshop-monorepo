/**
 * 枚举: 启用状态
 */
export enum EnabledEnum {
  YES = 'Y',
  NO = 'N',
}

/**
 * 字典: 启用状态
 *
 * @see {@link IEnabled}
 */
export const ENABLED = [
  { value: EnabledEnum.YES, label: '启用' },
  { value: EnabledEnum.NO, label: '停用' },
]
