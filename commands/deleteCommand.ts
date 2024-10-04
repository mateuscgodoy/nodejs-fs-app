import fs from 'node:fs/promises';

import StdError from '../error';
import ICommand from './ICommand';

interface DeleteParams {
  path: string;
}

export default class DeleteCommand implements ICommand<DeleteParams> {
  private _regex: RegExp = /^delete the file\s+(.+)$/;

  public get regex(): RegExp {
    return this._regex;
  }

  matchPattern(commandString: string): DeleteParams | null {
    const match = commandString.match(this._regex);
    if (match) {
      const path = match[1];
      return { path };
    }
    return null;
  }

  async action(params: DeleteParams): Promise<void> {
    const { path } = params;
    try {
      await fs.unlink(path);
      console.log(`✅ File from path ${path} deleted successfully`);
    } catch (error) {
      if (error instanceof StdError && error.code === 'ENOENT') return;
      if (error instanceof Error) {
        console.error(`❌ Error: ${error.message}`);
      }
    }
  }
}
