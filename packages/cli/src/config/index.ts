import { ConfigLoader } from './loader'

export function loadConfig(): IConfig {
  const loader = new ConfigLoader()
  return loader.load()
}
