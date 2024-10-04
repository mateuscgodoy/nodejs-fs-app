import fs from 'node:fs/promises';

import StdError from '../error';
import ICommand from '../ICommand';

interface CreateParams {
  path: string;
}

export class CreateCommand implements ICommand<CreateParams> {
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
    } catch (error) {
      console.error(error);
    }
  }
}
