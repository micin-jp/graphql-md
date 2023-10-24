import yargs from 'yargs';
import { z } from 'zod';

const argsParser = yargs
  .command('*', 'Generate markdown from a GraphQL schema', {
    configPath: {
      alias: 'c',
      description: 'Path to the config file',
      type: 'string',
    }
  })

const Args = z.object({
  configPath: z.string().default('graphql-md.yaml'),
})

export type Args = z.infer<typeof Args>

export const loadArgs = (): Args => { 
  const args = argsParser.parse()
  const validationResult = Args.safeParse(args)
  if (validationResult.success) {
    return validationResult.data
  }
  throw new Error(validationResult.error.message)
}