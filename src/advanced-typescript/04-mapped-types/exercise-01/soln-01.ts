export type To<T, U> = {
  [K in keyof T]: U;
};

export type ToNumber<T> = To<T, number>;
