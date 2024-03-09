import type { ICallback, TModuleDefinition } from '~/types'

/**
 * Define a module
 *
 * @param definition TModuleDefinition
 * @returns ICallback
 */
export function defineModule(definition: TModuleDefinition): ICallback {
  if (!definition.id)
    throw new Error('🐤 Module "id" is required.')

  if (!definition.space)
    throw new Error('🐤 Module "space" is required.')

  if (!definition.name)
    throw new Error('🐤 Module "name" is required.')

  return () => {
    if (definition.setup)
      definition.setup()

    // Create module
    useContext().createModule({
      ...definition,
      id: `${definition.space}.${definition.id}`,
    })
  }
}

/**
 * Load all modules
 */
export function loadModules() {
  Object.values(import.meta.glob<ICallback>('~/modules/**/install.ts', {
    eager: true,
    import: 'default',
  }),
  ).forEach(module => module())
}
