export type To<T, U> = {
  [K in keyof T]: U;
};
