type Flatten<T> = T extends Array<infer R> ? R : T;
