type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;
type Equals<X, Y> = Equal<X, Y> extends true ? [true, Y] : [false, Y];
type Assert<X extends [true, any]> = X[1];
type Expand<T> = {} & { [K in keyof T]: T[K] };

// type TODO = never;

// prettier-ignore
type Fields<T, P extends string = ""> =
  keyof T extends infer K extends keyof T & string
  ? K extends unknown ? Fields_<K, T, P> : never
  : never;

// prettier-ignore
type Fields_<K extends keyof T & string, T, P extends string> =
  T[K] extends Record<string, unknown>
  ? [`${P}${K}`, T[K]] | Fields<T[K], `${P}${K}.`>
  : [`${P}${K}`, T[K]]

// prettier-ignore
type T01 = [
  Assert<Equals<
    ["name", {first: string, last: string}] | ["name.first", string] | ["name.last", string],
    Fields<{name: {first: string, last: string}}>
  >>,
  Assert<Equals<
    ["name", {first: string, last: string}] | ["name.first", string] | ["name.last", string] | ["age", number],
    Fields<{name: {first: string, last: string}, age: number}>
  >>
]

// prettier-ignore
type Flatten<T> = {
  [E in Fields<T> as E extends [infer K, infer _] ? K : never]: E extends [infer _, infer V] ? V : never;
};

// prettier-ignore
type T02 = [
  Assert<Equals<
    {name: {first: string, last: string}, "name.first": string, "name.last": string},
    Flatten<{name: {first: string, last: string}}>
  >>,
  Assert<Equals<
    {name: {first: string, last: string}, "name.first": string, "name.last": string, age: number},
    Flatten<{name: {first: string, last: string}, age: number}>
  >>,
]

type BSONTypes =
  | "double"
  | "string"
  | "object"
  | "array"
  | "binData"
  | "undefined"
  | "objectId"
  | "bool"
  | "date"
  | "null"
  | "regex"
  | "dbPointer"
  | "javascript"
  | "symbol"
  | "int"
  | "timestamp"
  | "long"
  | "decimal"
  | "minKey"
  | "maxKey";

// prettier-ignore
type Criteria<T> =
  T extends Array<infer X>
  ? Criteria<X> extends infer C ? C & {$all?: X[], $elemMatch?: C, $size?: number} : never
  : { $eq?: T, $gt?: T, $gte?: T, $lt?: T, $lte?: T, $ne?: T, $in?: T[], $nin?: T[], $exists?: boolean, $type?: BSONTypes};

// prettier-ignore
type Find_<T> =
  Flatten<T> extends infer X
    ? { [K in keyof X]: X[K] | Expand<Criteria<X[K]>> }
    : never;

// prettier-ignore
type Find<T> = Find_<T> extends infer X ? X | {$and: X[]} | {$or: X[]} : never;

type X01 = Find<{ name: { first: string; last: string }; age: number }>;
type X02 = Find<{ name: { first: string; last: string }; contribs: string[] }>;
type X03 = Find<{ contribs: string[] }>;

// A not so simple document type
type Bio = {
  _id: number;
  name: { first: string; last: string };
  birth: Date;
  death: Date;
  contribs: string[];
  // TODO: support "awards.year" when awards is an array
  awards: { award: string; year: number; by: string }[];
};

type X04 = Find<Bio>;

export { T01, T02, X01, X02, X03, X04 };
