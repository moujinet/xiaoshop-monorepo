import { join } from 'node:path'
import { readFileSync } from 'node:fs'

export function readFile(name: string, root: string | false = '') {
  const path = root !== false
    ? join(root || process.cwd(), name)
    : name

  return readFileSync(path, 'utf8')
}

export function readAnyOf(names: string[], root: string = '') {
  let error: string | undefined

  for (let id = 0; id < names.length; id++) {
    const name = names[id]

    try {
      return readFile(name, root)
    }
    catch (e) {
      if (!error && typeof e?.code === 'string') {
        if (['EACCES', 'EPERM'].includes(e.code))
          error = e.path.replace(process.cwd(), '.')
      }

      if (id === names.length - 1 === false)
        continue

      if (error)
        return `ERROR: Read File ${error} failed.`
      else
        return undefined
    }
  }
}
