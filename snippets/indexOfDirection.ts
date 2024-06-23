type Direction = "left" | "right" | "up" | "down";

// prettier-ignore
type IndexOf<T extends Direction> =
  T extends "left"
  ? 0
  : T extends "right"
    ? 1
    : T extends "up"
      ? 2
      : T extends "down"
        ? 3
        : never;

type _ = [
  Expect<Equal<IndexOf<"left">, 0>>,
  Expect<Equal<IndexOf<"right">, 1>>,
  Expect<Equal<IndexOf<"up">, 2>>,
  Expect<Equal<IndexOf<"down">, 3>>,
];

type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { _ };
