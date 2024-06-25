// eslint-disable-next-line
// @ts-nocheck

// Type the `get` function so that the return type is the type of the field in
// the object `T` following the path `S`

declare function get<T, S extends string>(obj: T, path: S): TODO;

// several object keys
declare const o01: { a: { b: { c: string } } };
const r01 = get(o01, "a.b.c");
type T01 = Expect<Equal<typeof r01, string>>;

// objects and arrays
declare const o02: { author: { friends: [{ age: 29 }] } };
const r02 = get(o02, "author.friends[0].age");
type T02 = Expect<Equal<typeof r02, 29>>;

// accessing a precise index of a tuple type
declare const o03: { author: { friends: [undefined, { name: "Bob" }] } };
const r03 = get(o03, "author.friends[1].name");
type T03 = Expect<Equal<typeof r03, "Bob">>;

// several tuple types
declare const o04: [1, 2, [3, [{ title: "🎉" }]]];
const r04 = get(o04, "[2][1][0].title");
type T04 = Expect<Equal<typeof r04, "🎉">>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { T01, T02, T03, T04, TODO };
