type FirstArg<T> = T extends (first: infer FirstArgument, ...args: any[]) => any
  ? FirstArgument
  : never;
