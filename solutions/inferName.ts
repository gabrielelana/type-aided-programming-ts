type GetName<X> = X extends { name: infer N } ? N : undefined;

type r01 = GetName<{ name: "Gabriele" }>;
type T01 = Expect<Equal<r01, "Gabriele">>;

type r02 = GetName<{ name: string; age: number }>;
type T02 = Expect<Equal<r02, string>>;

type r03 = GetName<{ age: number }>;
type T03 = Expect<Equal<r03, undefined>>;

type r04 = GetName<{
  name: { firstName: string; lastName: string };
  age: number;
}>;
type T04 = Expect<Equal<r04, { firstName: string; lastName: string }>>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { T01, T02, T03, T04, TODO };
