import { writeFile } from "fs";
import { loadConfig } from "../config";
import { exec } from "../main";
import { output } from "../output";
import { render } from "../render";
import { loadSchema } from "../schema";

vi.mock('../args', () => {
  return {
    ...vi.importActual('../args'),
    loadArgs: vi.fn().mockReturnValue({
      configPath: 'src/__test__/test-data/graphql-md.yaml'
    }),
  }
});


describe('Test', () => { 
  it('should be true', () => {
    const c = loadConfig('src/__test__/test-data/graphql-md.yaml')
    const s = loadSchema(c)
    const r = render(s, c)
    expect(r).toMatchSnapshot()
  })
});