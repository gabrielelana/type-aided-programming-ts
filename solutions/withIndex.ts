// Write a type that given a tuple will return a tuple where the elements are a
// tuple with `[value, index]` where `value` is the value from the original
// tuple an `index` is the numerical index starting from zero.

// HINT: You can read the property "length" of a tuple/array,  T["length"]

// prettier-ignore
type WithIndex<Tuple extends any[], Output extends any[] = []> =
  Tuple extends [infer H, ...infer T]
  ? WithIndex<T, [...Output, [H, Output["length"]]]>
  : Output;

type R01 = WithIndex<["a"]>;
type T01 = Expect<Equal<R01, [["a", 0]]>>;

type R02 = WithIndex<["a", "b"]>;
type T02 = Expect<Equal<R02, [["a", 0], ["b", 1]]>>;

type R03 = WithIndex<["a", "b", "c"]>;
type T03 = Expect<Equal<R03, [["a", 0], ["b", 1], ["c", 2]]>>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { T01, T02, T03, TODO };
