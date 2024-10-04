import fs from 'node:fs/promises';

import ICommand from './ICommand';

interface CreateParams {
  path: string;
}

export default class CreateCommand implements ICommand<CreateParams> {
  private _regex: RegExp = /^create the file\s+(.+)$/;

  public get regex(): RegExp {
    return this._regex;
  }

  matchPattern(commandString: string): CreateParams | null {
    const match = commandString.match(this._regex);
    if (match) {
      const path = match[1];
      return { path };
    }
    return null;
  }

  async action(params: CreateParams): Promise<void> {
    const { path } = params;
    try {
      await fs.writeFile(path, '', { flag: 'wx' });
      console.log('✅ File create with success');
    } catch (error) {
      if (error instanceof Error) {
        console.error(`❌ Error: ${error.message}`);
      }
    }
  }
}
