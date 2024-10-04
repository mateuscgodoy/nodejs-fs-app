import fs from 'node:fs/promises';

import { CommandFileHandler } from './commandFileHandler';
import getCommands from './commands/getCommands';

const COMMAND_FILE_PATH = './command.txt';
const DEBOUNCE_DELAY = 100;

async function main() {
  const commands = getCommands();
  const commandFileHandler = new CommandFileHandler(
    COMMAND_FILE_PATH,
    commands
  );
  const watcher = fs.watch(COMMAND_FILE_PATH);
  let timeout;

  for await (const event of watcher) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (event.eventType === 'change') {
        commandFileHandler.emit(event.eventType);
      }
    }, DEBOUNCE_DELAY);
  }
}

main();
