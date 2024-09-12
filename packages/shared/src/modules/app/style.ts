/**
 * 应用样式
 */
export interface IAppStyle {
  /**
   * 字体
   *
   * @see {@link IAppStyleFont}
   */
  font: Partial<IAppStyleFont>
  /**
   * 文本
   *
   * @see {@link IAppStyleText}
   */
  text: Partial<IAppStyleText>
  /**
   * 背景
   *
   * @see {@link IAppStyleBackground}
   */
  background: Partial<IAppStyleBackground>
  /**
   * 外边距
   *
   * @see {@link IAppStyleMargin}
   */
  margin: Partial<IAppStyleMargin>
  /**
   * 内边距
   *
   * @see {@link IAppStylePadding}
   */
  padding: Partial<IAppStylePadding>
  /**
   * 阴影
   *
   * @see {@link IAppStyleBoxShadow}
   */
  shadow: Partial<IAppStyleBoxShadow>
  /**
   * 边框
   */
  border: {
    /**
     * 边框 - 顶部
     *
     * @see {@link IAppStyleBorder}
     */
    top: Partial<IAppStyleBorder>
    /**
     * 边框 - 右侧
     *
     * @see {@link IAppStyleBorder}
     */
    right: Partial<IAppStyleBorder>
    /**
     * 边框 - 底部
     *
     * @see {@link IAppStyleBorder}
     */
    bottom: Partial<IAppStyleBorder>
    /**
     * 边框 - 左侧
     *
     * @see {@link IAppStyleBorder}
     */
    left: Partial<IAppStyleBorder>
    /**
     * 边框 - 圆角
     */
    radius: string
  }
}

/**
 * 应用样式 - 文本
 */
export interface IAppStyleText {
  /**
   * 对齐方式
   */
  align: 'start' | 'end' | 'left' | 'center' | 'right' | 'justify'
  /**
   * 大小写
   */
  transform: 'uppercase' | 'lowercase' | 'capitalize'
  /**
   * 缩进
   */
  indent: string
  /**
   * 行高
   */
  height: string
  /**
   * 修饰
   *
   * @see {@link IAppStyleTextDecoration}
   */
  decoration: Partial<IAppStyleTextDecoration>
  /**
   * 阴影
   *
   * @see {@link IAppStyleTextShadow}
   */
  shadow: Partial<IAppStyleTextShadow>
}

/**
 * 应用样式 - 文本阴影
 */
export interface IAppStyleTextShadow {
  /**
   * 颜色
   */
  color: string
  /**
   * 偏移 X
   */
  offsetX: number
  /**
   * 偏移 Y
   */
  offsetY: number
  /**
   * 模糊
   */
  blur: number
}

/**
 * 应用样式 - 文本修饰
 */
export interface IAppStyleTextDecoration {
  /**
   * 颜色
   */
  color: string
  /**
   * 线条
   */
  line: 'none' | 'underline' | 'overline' | 'line-through'
  /**
   * 风格
   */
  style: 'solid' | 'dashed' | 'dotted' | 'wavy'
  /**
   * 下划线偏移
   */
  underlineOffset: string
}

/**
 * 应用样式 - 字体
 */
export interface IAppStyleFont {
  /**
   * 字号
   */
  size: number
  /**
   * 颜色
   */
  color: string
  /**
   * 风格
   */
  style: 'normal' | 'italic'
  /**
   * 粗细
   */
  weight: 'normal' | 'bold' | 'bolder' | 'lighter'
}

/**
 * 应用样式 - 背景
 */
export interface IAppStyleBackground {
  /**
   * 背景色
   */
  color: string
  /**
   * 背景图
   */
  image: string
  /**
   * 尺寸
   */
  size: 'cover' | 'contain' | string
}

/**
 * 应用样式 - 边框
 */
export interface IAppStyleBorder {
  /**
   * 颜色
   */
  color: string
  /**
   * 风格
   */
  style: 'solid' | 'dashed' | 'dotted'
  /**
   * 宽度
   */
  width: string
}

/**
 * 应用样式 - 阴影
 */
export interface IAppStyleBoxShadow {
  /**
   * 内阴影
   */
  inset: boolean
  /**
   * 颜色
   */
  color: string
  /**
   * 偏移 X
   */
  offsetX: number
  /**
   * 偏移 Y
   */
  offsetY: number
  /**
   * 模糊
   */
  blur: number
}

/**
 * 应用样式 - 外边距
 */
export interface IAppStyleMargin {
  /**
   * 上
   */
  top: string
  /**
   * 右
   */
  right: string
  /**
   * 下
   */
  bottom: string
  /**
   * 左
   */
  left: string
}

/**
 * 应用样式 - 内边距
 */
export interface IAppStylePadding extends IAppStyleMargin {}
