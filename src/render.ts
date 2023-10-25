
import {
  GraphQLEnumType,
  GraphQLUnionType,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLArgument,
} from 'graphql'
import { SchemaData } from './schema'
import { Config } from './config'

const toPascalCase = (str: string) => {
  return str
    .split(/[-_]/)
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join('')
}

const toSectionLink = (str: string) => {
  return `[${str}](#${toPascalCase(str)})`
}

const wrapString = (str: string) => str.replace(/\n/g, '<br>')

const argsToMd = (args: ReadonlyArray<GraphQLArgument>): string => {
  return args.map((arg) => `${arg.name}: ${toSectionLink(arg.type.toString())}`).join('<br>')
}

const getTypeMarkdown = (
  type:
    | GraphQLObjectType
    | GraphQLEnumType
    | GraphQLUnionType
    | GraphQLInputObjectType
): string => {
  let markdown = `#### ${type.name}\n\n`
  if (type.description) {
    markdown += `${type.description}\n\n`
  }
  if (
    type instanceof GraphQLObjectType ||
    type instanceof GraphQLInputObjectType
  ) {
    markdown += '| Field | Type | Description |\n'
    markdown += '| ----- | ---- | ----------- |\n'
    for (const field of Object.values(type.getFields())) {
      markdown += `| ${field.name} | ${field.type} | ${wrapString(
        field.description ?? ''
      )} |\n`
    }
  } else if (type instanceof GraphQLEnumType) {
    markdown += '| Value | Description |\n'
    markdown += '| ----- | ----------- |\n'
    for (const value of Object.values(type.getValues())) {
      markdown += `| ${value.name} | ${wrapString(value.description ?? '')} |\n`
    }
  } else if (type instanceof GraphQLUnionType) {
    markdown += '| Type | Description |\n'
    markdown += '| ---- | ----------- |\n'
    for (const value of Object.values(type.getTypes())) {
      markdown += `| ${value.name} | ${wrapString(value.description ?? '')} |\n`
    }
  }
  return markdown
}


export const render = (schemaData: SchemaData, config: Config): string => {
  const title = config.title
  const description = config.description
  // Generate the Markdown documentation
  let markdown = ''

  // Add the title
  markdown += `# ${title}\n\n`
  markdown += `${description}\n\n`
  const {
    queries,
    mutations,
    types: { objects, enums, unions, inputs },
  } = schemaData

  if (queries) {
    // Add the Query types
    markdown += '## Query\n\n'
    markdown += '| name | Type | Description |\n'
    markdown += '| ---- | ---- | ----------- |\n'
    for (const field of Object.values(queries.getFields())) {
      markdown += `| ${field.name} | ${
        toSectionLink(field.type.toString())
      } | ${wrapString(field.description ?? '')} |\n`
    }
  }

  if (mutations) {
    // Add the Mutation types
    markdown += '## Mutation\n\n'
    markdown += '| name | input | Type | Description |\n'
    markdown += '| ---- | -- | -- | ----------- |\n'
    for (const field of Object.values(mutations.getFields())) {
      markdown += `| ${field.name} | ${argsToMd(field.args)} | ${
        toSectionLink(field.type.toString())
      } | ${wrapString(field.description ?? '')} |\n`
    }
  }

  markdown += '## Types \n\n'

  if (objects.length > 0) {
    markdown += '### Objects\n\n'
    for (const o of objects) {
      markdown += getTypeMarkdown(o)
    }
  }

  if (enums.length > 0) {
    markdown += '### Enums\n\n'
    for (const e of enums) {
      markdown += getTypeMarkdown(e)
    }
  }

  if (unions.length > 0) {
    markdown += '## Unions\n\n'
    for (const u of unions) {
      markdown += getTypeMarkdown(u)
    }
  }

  if (inputs.length > 0) {
    markdown += '### Inputs\n\n'
    for (const i of inputs) {
      markdown += getTypeMarkdown(i)
    }
  }

  return markdown
}
