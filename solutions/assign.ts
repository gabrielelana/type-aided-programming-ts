// Implement at type-level the same behaviour of `{...a, ...b}` at run-time

type Assign<A, B> = { [K in keyof Omit<A, keyof B>]: A[K] } & B;

const assign = <A, B>(obj1: A, obj2: B): Assign<A, B> => ({
  ...obj1,
  ...obj2,
});

// Override `id`
type R01 = Assign<{ name: string; id: number }, { id: string }>;
type T01 = Expect<Equal<R01, { name: string } & { id: string }>>;

// Override `age` and `role`
type R02 = Assign<
  { name: string; age: string; role: string },
  { age: 42; role: "admin" }
>;
type T02 = Expect<Equal<R02, { name: string } & { age: 42; role: "admin" }>>;

// No overlap
type R03 = Assign<{ name: string; id: number }, { age: number }>;
type T03 = Expect<Equal<R03, { name: string; id: number } & { age: number }>>;

// Using type inference from values
const R04 = assign({ name: "Bob", id: 4 }, { id: "3" });
type T04 = Expect<Equal<typeof R04, { name: string } & { id: string }>>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { T01, T02, T03, T04, TODO };
