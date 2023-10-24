import { readFileSync } from 'fs'

import {
  buildSchema,
  GraphQLSchema,
  GraphQLEnumType,
  GraphQLUnionType,
  GraphQLObjectType,
  GraphQLInputObjectType,
} from 'graphql'
import { Config } from './config'

const DEFAULT_GRAPHQL_SCALARS = [
  'String',
  'Int',
  'Float',
  'BigInt',
  'Boolean',
  'DateTime',
  'JSON',
  'JSONObject',
]

export type SchemaData = {
  queries?: GraphQLObjectType
  mutations?: GraphQLObjectType
  types: {
    objects: GraphQLObjectType[]
    enums: GraphQLEnumType[]
    unions: GraphQLUnionType[]
    inputs: GraphQLInputObjectType[]
  }
}

export const loadSchema = (config: Config): SchemaData => {
  // Read the schema file
  const schemaString = readFileSync(config.schemaPath, 'utf8')

  // Build the schema object
  const schema: GraphQLSchema = buildSchema(schemaString)

  const queries = schema.getQueryType() ?? undefined
  const mutations = schema.getMutationType() ?? undefined
  const types = Object.values(schema.getTypeMap())

  const objects = types
    .filter((t): t is GraphQLObjectType => t instanceof GraphQLObjectType)
    .filter((t) => !DEFAULT_GRAPHQL_SCALARS.includes(t.name))
    .filter((t) => !t.name.startsWith('__'))
    .filter((t) => t.name !== 'Query' && t.name !== 'Mutation')
  const enums = types.filter(
    (t): t is GraphQLEnumType => t instanceof GraphQLEnumType
  )
  const unions = types.filter(
    (t): t is GraphQLUnionType => t instanceof GraphQLUnionType
  )
  const inputs = types.filter(
    (t): t is GraphQLInputObjectType => t instanceof GraphQLInputObjectType
  )

  return {
    queries,
    mutations,
    types: {
      objects,
      enums,
      unions,
      inputs,
    },
  }
}