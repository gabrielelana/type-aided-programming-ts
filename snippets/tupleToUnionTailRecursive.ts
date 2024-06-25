// prettier-ignore
type TupleToUnion<T extends any[], R = never> =
  T extends [infer H, ...infer T]
  ? TupleToUnion<T, R | H>
  : R;

type T01 = TupleToUnion<[string, number]>; // string | number
type T02 = TupleToUnion<[true, false]>; // boolean
type T03 = TupleToUnion<[]>; // never

export { T01, T02, T03 };
