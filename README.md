# graphql-md
A CLI tool to generate a GraphQL schema from Markdown files.

## How to use
1. Clone the repo
2. Run `npm install`
3. Run `npm run build`
4. Run `npm link`
5. Run `npm link @micin-jp/graphql-md` at the root of your project
6. Run `graphql-md` at the root of your project


## Configuration
graphql-md requires configuration file in yaml format. The default file path is `./graphql-md.yml`. You can change the file name by passing `--configPath` option.

### Example
```yaml
# graphql-md.yml
schemaPath: './schema.graphql'
outputPath: './api.md'
title: 'API Reference'
description: 'This is an API reference'
```
