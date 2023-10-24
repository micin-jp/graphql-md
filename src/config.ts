import { readFileSync } from 'fs'
import { parse } from 'yaml'

import { z } from 'zod'

export const Config = z.object({
  title: z.string().default('API Documentation'),
  description: z.string().default(''),
  schemaPath: z.string().default('schema.graphql'),
  outputPath: z.string().default('graphql-schema.md'),
})

export type Config = z.infer<typeof Config>

export const loadConfig = (configPath: string): Config => { 
  const yamlStr = readFileSync(configPath, 'utf8')
  const parsed = parse(yamlStr)
  const validationResult = Config.safeParse(parsed)
  if (validationResult.success) {
    return validationResult.data
  }
  throw new Error(validationResult.error.message)
}