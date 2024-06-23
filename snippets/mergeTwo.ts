// eslint-disable-next-line
// @ts-nocheck

function mergeTwo(a: TODO, b: TODO): TODO {
  return { ...a, ...b };
}

const res1 = mergeTwo({ name: "Bob" }, { age: 42 });
type test1 = Expect<Equal<typeof res1, { name: string } & { age: number }>>;

const res2 = mergeTwo({ greeting: "Hello" }, {});
type test2 = Expect<Equal<typeof res2, { greeting: string }>>;

const res3 = mergeTwo({}, { greeting: "Hello" });
type test3 = Expect<Equal<typeof res3, { greeting: string }>>;

const res4 = mergeTwo({ a: 1, b: 2 }, { c: 3, d: 4 });
type test4 = Expect<
  Equal<typeof res4, { a: number; b: number } & { c: number; d: number }>
>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { test1, test2, test3, test4, TODO };
