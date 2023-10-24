import { loadSchema } from "./schema"
import { render } from "./render"
import { loadConfig } from "./config"
import { output } from "./output"
import { loadArgs } from './args';


export const exec = () => { 
  const args = loadArgs()
  const config =  loadConfig(args.configPath)
  const schemaData = loadSchema(config)
  const markdown = render(schemaData, config)
  output(markdown, config)  
}
