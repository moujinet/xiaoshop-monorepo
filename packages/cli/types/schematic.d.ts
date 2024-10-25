declare interface ISchematicDefinition {
  name: string
  alias: string
  description: string
}

declare interface ISchematicAction {
  type: 'add' | 'update' | string
  dest: string
  template?: string
  isActive?: (data: Record<string, any>) => boolean
}

declare interface ISchematic extends IHandler {
  /**
   * 脚手架名称
   */
  readonly name: string

  /**
   * 用户输入
   */
  prompts: () => Promise<Record<string, any>>

  /**
   * 生成动作
   */
  actions: () => Promise<ISchematicAction[]>
}
