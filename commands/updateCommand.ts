import fs from 'node:fs/promises';

import ICommand from './ICommand';

interface UpdateParams {
  path: string;
  content: string;
}

export default class UpdateCommand implements ICommand<UpdateParams> {
  private _regex: RegExp = /^update the file\s+(.+)\s+with content:\s+(.+)$/;

  public get regex(): RegExp {
    return this._regex;
  }

  matchPattern(commandString: string): UpdateParams | null {
    const match = commandString.match(this._regex);
    if (match) {
      const path = match[1];
      const content = match[2];
      return { path, content };
    }
    return null;
  }

  async action(params: UpdateParams): Promise<void> {
    const { path, content } = params;
    await fs.writeFile(path, content, { flag: 'a' });
    console.log('Content successfully added to the file');
  }
}
