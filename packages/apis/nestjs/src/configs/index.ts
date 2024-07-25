import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import * as yaml from 'js-yaml'

const env = process.env.NODE_ENV

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, `./${env}.yaml`), 'utf8'),
  ) as Record<string, any>
}
