export type To<T, K> = {
  [Key in keyof T]: K;
};
