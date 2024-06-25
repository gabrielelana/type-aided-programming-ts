// eslint-disable-next-line
// @ts-nocheck

// Implement type utility ToUppercase as in standard library
// https://www.typescriptlang.org/docs/handbook/utility-types.html#uppercasestringtype
// only for characters in `[a-z]`

// Can you implement it by reusing the same map from ToLowercase?

type ToLowercaseMap = {
  A: "a";
  B: "b";
  C: "c";
  D: "d";
  E: "e";
  F: "f";
  G: "g";
  H: "h";
  I: "i";
  J: "j";
  K: "k";
  L: "l";
  M: "m";
  N: "n";
  O: "o";
  P: "p";
  Q: "q";
  R: "r";
  S: "s";
  T: "t";
  U: "u";
  V: "v";
  W: "w";
  X: "x";
  Y: "y";
  Z: "z";
};

type ToUppercase<_S extends string> = TODO;

type R01 = ToUppercase<"hello">;
type T01 = Expect<Equal<R01, "HELLO">>;

type R02 = ToUppercase<"Hello">;
type T02 = Expect<Equal<R02, "HELLO">>;

type R03 = ToUppercase<"">;
type T03 = Expect<Equal<R03, "">>;

type R04 = ToUppercase<"Catch42!">;
type T04 = Expect<Equal<R04, "CATCH42!">>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { T01, T02, T03, T04, TODO, ToLowercaseMap };
