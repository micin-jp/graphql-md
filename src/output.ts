import { writeFile } from 'fs'

import { Config } from "./config";

export const output = async (source: string, config: Config): Promise<void> => {
  await writeFile(config.outputPath, source, (err) => {
    if (err) throw err
  })
}