/**
 * From T, pick a set of properties whose keys are in the union K
 */
export type _Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
