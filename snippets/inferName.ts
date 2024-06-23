// eslint-disable-next-line
// @ts-nocheck

type GetName<X> = TODO;

type R01 = GetName<{ name: "Gabriele" }>;
type T01 = Expect<Equal<R01, "Gabriele">>;

type R02 = GetName<{ name: string; age: number }>;
type T02 = Expect<Equal<R02, string>>;

type R03 = GetName<{ age: number }>;
type T03 = Expect<Equal<R03, undefined>>;

type R04 = GetName<{
  name: { firstName: string; lastName: string };
  age: number;
}>;
type T04 = Expect<Equal<R04, { firstName: string; lastName: string }>>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { T01, T02, T03, T04, TODO };
