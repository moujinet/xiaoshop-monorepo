export const defaultConfig: IConfig = {
  sourceRoot: 'src',
  moduleRoot: '{{ SRC }}/modules',
  typeorm: {
    lib: '{{ CLI }}/scripts/typeorm.js',
    datasource: '{{ SRC }}/config/datasource.ts',
    migrations: '{{ SRC }}/database/migrations',
  },
}

export const supportedConfigFileNames = [
  'xiao.json',
  'xiaoshop.json',
  'xiaoshop-cli.json',
  '.xiao.json',
  '.xiaoshop.json',
  '.xiaoshop-cli.json',
]
