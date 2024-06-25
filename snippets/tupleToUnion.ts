// prettier-ignore
type TupleToUnion<T extends any[]> =
  T extends [infer H, ...infer T]
  ? H | TupleToUnion<T>
  : never;

type T01 = TupleToUnion<[string, number]>; // string | number
type T02 = TupleToUnion<[true, false]>; // boolean
type T03 = TupleToUnion<[]>; // never

export { T01, T02, T03 };
