import * as yaml from 'js-yaml'
import { join } from 'node:path'
import { readFileSync } from 'node:fs'

const env = process.env.NODE_ENV

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, `./yaml/${env}.yaml`), 'utf8'),
  ) as Record<string, any>
}
