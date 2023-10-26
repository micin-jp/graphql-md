# graphql-md
A CLI tool to generate a Markdown file from GraphQL schema.

## How to use
### Install
```bash
npm install -g graphql-md
```


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

### Run
```bash
graphql-md
```
