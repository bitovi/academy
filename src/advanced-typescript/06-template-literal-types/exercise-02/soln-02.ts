type FromGetter<T> = {
  [Key in keyof T as Key extends `get${infer Property}`
    ? Lowercase<Property>
    : never]: T[Key] extends (...args: any) => any
    ? ReturnType<T[Key]>
    : T[Key];
};
