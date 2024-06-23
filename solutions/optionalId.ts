// Combine Partial, Omit and Pick to implement MakeIdOptional

// prettier-ignore
type MakeIdOptional<O extends { id: unknown }> =
  Partial<Pick<O, "id">> & Omit<O, "id">;

type R01 = MakeIdOptional<{
  id: number;
  name: string;
  age: unknown;
}>;

type T01 = Expect<Equal<R01, { id?: number } & { name: string; age: unknown }>>;

type R02 = MakeIdOptional<{
  id: string;
  title: string;
  content: string;
}>;

type T02 = Expect<
  Equal<R02, { id?: string } & { title: string; content: string }>
>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { T01, T02, TODO };
