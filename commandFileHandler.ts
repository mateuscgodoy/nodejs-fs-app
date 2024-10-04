import fs, { FileHandle } from 'node:fs/promises';
import { EventEmitter } from 'node:events';

import ICommand from './commands/ICommand';

export class CommandFileHandler {
  private commandFilePath: string;
  private fileHandler = {} as FileHandle;
  /**
   * This is purely to satisfy a bug on FileHandle Interface
   * Which does not reference that it is an EventEmitter at all
   * As stated in node documentation: https://nodejs.org/api/fs.html#class-filehandle
   */
  private eventEmitter = {} as EventEmitter;
  private commands: ICommand[];

  constructor(commandFilePath: string, commands: ICommand[]) {
    this.commandFilePath = commandFilePath;
    this.commands = commands;
    this.init();
  }

  private async init() {
    this.fileHandler = await fs.open(this.commandFilePath, 'r');
    this.eventEmitter = this.fileHandler as unknown as EventEmitter;
    this.eventEmitter.on('change', this.handleChange);
  }

  private handleChange = async () => {
    const command = await this.extractCommand();
    for (const cmd of this.commands) {
      const params = cmd.matchPattern(command);
      if (params) {
        cmd.action(params);
        return;
      }
    }
    console.log('Unknown command entered');
  };

  private async extractCommand(): Promise<string> {
    const { size } = await this.fileHandler.stat();
    const buffer = Buffer.alloc(size);
    await this.fileHandler.read({
      buffer,
      offset: 0,
      length: buffer.byteLength,
      position: 0,
    });
    return buffer.toString();
  }

  emit(eventStr: string) {
    this.eventEmitter.emit(eventStr);
  }
}
