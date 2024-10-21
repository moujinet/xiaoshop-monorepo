declare interface IConfigTypeOrmOptions {
  [key: string]: any
  lib: string
  datasource: string
  migrations: string
}

declare interface IConfig {
  sourceRoot: string
  moduleRoot: string
  typeorm: IConfigTypeOrmOptions
}

declare type IConfigPath = 'CWD' | 'CLI' | 'SRC'
