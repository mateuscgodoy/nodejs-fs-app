export default interface ICommand<TParams = any> {
  regex: RegExp;

  matchPattern(commandString: string): TParams | null;

  action(params: TParams): Promise<void>;
}
