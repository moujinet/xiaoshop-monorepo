/**
 * 全局定义 - 是否 - 枚举
 *
 * @see {@link IYesOrNo}
 */
export enum YesOrNo {
  YES = 'Y',
  NO = 'N',
}

/**
 * 全局定义 - 是否
 *
 * @see {@link YesOrNo}
 */
export type IYesOrNo = `${YesOrNo}`

/**
 * 全局定义 - 颜色 - 枚举
 *
 * @see {@link IColorName}
 */
export enum ColorName {
  RED = 'red',
  ORANGERED = 'orangered',
  ORANGE = 'orange',
  GOLD = 'gold',
  LIME = 'lime',
  GREEN = 'green',
  CYAN = 'cyan',
  BLUE = 'blue',
  ARCOBLUE = 'arcoblue',
  PURPLE = 'purple',
  PINKPURPLE = 'pinkpurple',
  MAGENTA = 'magenta',
  GRAY = 'gray',
}

/**
 * 全局定义 - 颜色
 *
 * @see {@link ColorName}
 */
export type IColorName = `${ColorName}`
