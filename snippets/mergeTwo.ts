// eslint-disable-next-line
// @ts-nocheck

function mergeTwo(a: TODO, b: TODO): TODO {
  return { ...a, ...b };
}

const r01 = mergeTwo({ name: "Bob" }, { age: 42 });
type T01 = Expect<Equal<typeof r01, { name: string } & { age: number }>>;

const r02 = mergeTwo({ greeting: "Hello" }, {});
type T02 = Expect<Equal<typeof r02, { greeting: string }>>;

const r03 = mergeTwo({}, { greeting: "Hello" });
type T03 = Expect<Equal<typeof r03, { greeting: string }>>;

const r04 = mergeTwo({ a: 1, b: 2 }, { c: 3, d: 4 });
type T04 = Expect<
  Equal<typeof r04, { a: number; b: number } & { c: number; d: number }>
>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { T01, T02, T03, T04, TODO };
