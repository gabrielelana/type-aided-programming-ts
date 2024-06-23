type AND<A, B> = [A, B] extends [true, true] ? true : false;

type R01 = AND<true, true>;
type T01 = Expect<Equal<R01, true>>;

type R02 = AND<false, false>;
type T02 = Expect<Equal<R02, false>>;

type R03 = AND<true, false>;
type T03 = Expect<Equal<R03, false>>;

type R04 = AND<false, true>;
type T04 = Expect<Equal<R04, false>>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { T01, T02, T03, T04, TODO };
