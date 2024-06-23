// eslint-disable-next-line
// @ts-nocheck

type TupleToArray<T extends any[]> = TODO;

type R01 = TupleToArray<[1, 2, 3]>;
type T01 = Expect<Equal<R01, (1 | 2 | 3)[]>>;

type R02 = TupleToArray<[number, string]>;
type T02 = Expect<Equal<R02, (number | string)[]>>;

type R03 = TupleToArray<[]>;
type T03 = Expect<Equal<R03, never[]>>;

type R04 = TupleToArray<[1] | [2] | [3]>;
type T04 = Expect<Equal<R04, (1 | 2 | 3)[]>>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { T01, T02, T03, T04, TODO };
