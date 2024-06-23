// eslint-disable-next-line
// @ts-nocheck

type AND<A, B> = TODO;

type r01 = AND<true, true>;
type T01 = Expect<Equal<r01, true>>;

type r02 = AND<false, false>;
type T02 = Expect<Equal<r02, false>>;

type r03 = AND<true, false>;
type T03 = Expect<Equal<r03, false>>;

type r04 = AND<false, true>;
type T04 = Expect<Equal<r04, false>>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { T01, T02, T03, T04, TODO };
