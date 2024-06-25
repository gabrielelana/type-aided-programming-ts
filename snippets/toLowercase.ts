// eslint-disable-next-line
// @ts-nocheck

// Implement type utility ToLowercase as in standard library
// https://www.typescriptlang.org/docs/handbook/utility-types.html#lowercasestringtype
// only for characters in `[A-Z]`

// Can you do it without having one condition for every character?

type ToLowercase<_S extends string> = TODO;

type R01 = ToLowercase<"HELLO">;
type T01 = Expect<Equal<R01, "hello">>;

type R02 = ToLowercase<"Hello">;
type T02 = Expect<Equal<R02, "hello">>;

type R03 = ToLowercase<"">;
type T03 = Expect<Equal<R03, "">>;

type R04 = ToLowercase<"CATCH42!">;
type T04 = Expect<Equal<R04, "catch42!">>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { T01, T02, T03, T04, TODO };
