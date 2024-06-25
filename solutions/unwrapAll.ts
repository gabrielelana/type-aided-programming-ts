declare function all<
  // `P` type parameter as a tuple of type `Promise<any>`
  P extends [Promise<any>, ...Promise<any>[]],
>(promises: P): Promise<UnwrapAll<P>>;

// prettier-ignore
type UnwrapAll<P> =
  P extends [Promise<infer H>, ...infer T]
  ? [H, ...UnwrapAll<T>]
  : []

const r01 = all([Promise.resolve(20), Promise.resolve("Hello" as const)]);
type expected1 = Promise<[number, "Hello"]>;
type T01 = Expect<Equal<typeof r01, expected1>>;

const r02 = all([
  Promise.resolve(true),
  Promise.resolve("!"),
  Promise.resolve({}),
]);
type expected2 = Promise<[boolean, string, {}]>;
type T02 = Expect<Equal<typeof r02, expected2>>;

const r03 = all([
  Promise.resolve(3),
  Promise.resolve("Hello" as const),
  Promise.resolve(true),
  Promise.resolve({ key: "value" }),
  Promise.resolve(["array"]),
]);
type expected3 = Promise<[number, "Hello", boolean, { key: string }, string[]]>;
type T03 = Expect<Equal<typeof r03, expected3>>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { T01, T02, T03, TODO };
