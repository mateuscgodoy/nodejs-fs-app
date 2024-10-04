import fs from 'node:fs/promises';
import { sep } from 'node:path';

import StdError from '../error';
import ICommand from '../ICommand';

interface RenameParams {
  path: string;
  newPath: string;
}

export default class RenameCommand implements ICommand<RenameParams> {
  private _regex: RegExp = /^rename the file\s+(.+)\s+to\s+(.+)$/;

  public get regex(): RegExp {
    return this._regex;
  }

  matchPattern(commandString: string): RenameParams | null {
    const match = commandString.match(this._regex);
    if (match) {
      const path = match[1];
      const newPath = match[2];
      return { path, newPath };
    }
    return null;
  }

  async action(params: RenameParams): Promise<void> {
    const { path, newPath } = params;
    try {
      await fs.rename(path, newPath);
      this.logSuccessMessage(path, newPath);
    } catch (error) {
      if (error instanceof StdError && error.code === 'ENOENT') return;
      console.error(error);
    }
  }

  private logSuccessMessage(path: string, newPath: string) {
    const pathParts = path.split(sep);
    const newPathParts = newPath.split(sep);

    console.log(
      `File renamed from ${pathParts[pathParts.length - 1]} to ${
        newPathParts[newPathParts.length - 1]
      } successfully`
    );
  }
}
