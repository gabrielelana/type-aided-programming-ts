// eslint-disable-next-line
// @ts-nocheck

type Last<Tuple extends any[]> = TODO;

type R01 = Last<[1, 2, 3]>;
type T01 = Expect<Equal<R01, 3>>;

type R02 = Last<[1]>;
type T02 = Expect<Equal<R02, 1>>;

type R03 = Last<[]>;
type T03 = Expect<Equal<R03, never>>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { T01, T02, T03, TODO };
