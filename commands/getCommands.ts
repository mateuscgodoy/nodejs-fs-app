import CreateCommand from './createCommand';
import UpdateCommand from './updateCommand';
import DeleteCommand from './deleteCommand';
import RenameCommand from './renameCommand';
import ICommand from './ICommand';

export default function getCommands(): ICommand[] {
  return [
    new CreateCommand(),
    new UpdateCommand(),
    new DeleteCommand(),
    new RenameCommand(),
  ];
}
