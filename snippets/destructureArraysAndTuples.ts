// prettier-ignore
type SwapTuple<T extends [any, any]> =
  T extends [infer X, infer Y]
  ? [Y, X]
  : never;

type T01 = SwapTuple<[string, number]>; // [number, string]

type DropFirst<T extends any[]> = T extends [infer _, ...infer X] ? X : never;

type T02 = DropFirst<[string, number]>; // [number]
type T03 = DropFirst<[string, number, boolean]>; // [number, boolean]

type Partial<T extends any[]> =
  T extends Array<infer X> ? Array<X | undefined> : never;

type T04 = Partial<string[]>; // (string | undefined)[]

export { T01, T02, T03, T04 };
