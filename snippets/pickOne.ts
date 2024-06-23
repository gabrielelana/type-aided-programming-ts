// eslint-disable-next-line
// @ts-nocheck

function pickOne(a: TODO, b: TODO): TODO {
  return Math.random() > 0.5 ? a : b;
}

const r01 = pickOne(true, false);
type T01 = Expect<Equal<typeof r01, boolean>>;

const r02 = pickOne(1, 2);
type T02 = Expect<Equal<typeof r02, 1 | 2>>;

const r03 = pickOne(2, "some string");
type T03 = Expect<Equal<typeof r03, 2 | "some string">>;

const r04 = pickOne(true, 7);
type T04 = Expect<Equal<typeof r04, true | 7>>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export { T01, T02, T03, T04, TODO };
