type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;
type Equals<X, Y> = Equal<X, Y> extends true ? [true, Y] : [false, Y];
type Assert<X extends [true, any]> = X[1];

type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
type Expand<T> = {} & { [K in keyof T]: T[K] };
type MergeO<T> = { [K in keyof T]: T[K] };

type JsonPrimitiveType = {
  number: number;
  integer: number;
  string: string;
  boolean: boolean;
  null: null;
};

// Primitive types
// {"type": "string"} -> string
// {"type": "string", "nullable": true} -> string | null
// {"type": ["string", "null"]} -> string | null
// {"type": ["string", "number"]} -> string | number

type FromSchemaNullable<T, X> = T extends { nullable: true } ? X | null : X;

// prettier-ignore
type FromSchemaTypeName<N> =
  N extends keyof JsonPrimitiveType
  ? JsonPrimitiveType[N]
  : N extends [infer H extends keyof JsonPrimitiveType, ...infer T]
  ? JsonPrimitiveType[H] | FromSchemaTypeName<T>
  : never;

// NOTE: left here to show the incremental solution, extended later
// prettier-ignore
// type FromSchemaType<J> = FromSchemaNullable<J,
//   J extends {type: infer X extends string | string[]}
//   ? FromSchemaTypeName<X>
//   : never
// >;

// prettier-ignore
type T01 = [
  Assert<Equals<number, FromSchemaType<{ type: "number" }>>>,
  Assert<Equals<number | null, FromSchemaType<{ type: "number"; nullable: true }>>>,
  Assert<Equals<number | null, FromSchemaType<{ type: ["number", "null"] }>>>,
];

// Array types
// NOTE: we are going to apply some assumptions
// {"type": "array", "items": {"type": "string"}} -> string[]
// {"type": "array", "items": {"type": ["string", "number"]}} -> (string | number)[]
// {"type": "array", "items": [{"type": "string"}, {"type": "number"}]} -> [string, number]
// TODO: {"type": "array"} -> unknown[]

// prettier-ignore
type FromSchemaTypeArray<J> =
  J extends { type: infer X }
  ? FromSchemaTypeName<X>[]
  : J extends [infer H, ...infer T]
  ? [FromSchemaType<H>, ...FromSchemaTypeArray<T>]
  : [];

// NOTE: left here to show the incremental solution, extended later
// prettier-ignore
// type FromSchemaType<J> = FromSchemaNullable<J,
//   J extends {type: "array", items: infer X}
//   ? FromSchemaTypeArray<X>
//   : J extends {type: infer X extends string | string[]}
//     ? FromSchemaTypeName<X>
//     : never
// >;

// prettier-ignore
type T02 = [
  Assert<Equals<string[], FromSchemaType<{ type: "array"; items: { type: "string" } }>>>,
  Assert<Equals<[string], FromSchemaType<{ type: "array"; items: [{ type: "string" }] }>>>,
  Assert<Equals<
    [string | number],
    FromSchemaType<{ type: "array"; items: [{ type: ["string", "number"] }] }>
  >>,
  Assert<Equals<
    [string, number],
    FromSchemaType<{ type: "array"; items: [{ type: "string" }, { type: "number" }] }>
  >>,
  Assert<Equals<
    [string | boolean, number],
    FromSchemaType<{ type: "array"; items: [{ type: ["string", "boolean"] }, { type: "number" }] }>
  >>,
  Assert<Equals<
    [string | boolean, number | null],
    FromSchemaType<{ type: "array"; items: [{ type: ["string", "boolean"] }, { type: "number", nullable: true }] }>
  >>,
]

// Object types
// NOTE: we are going to apply some assumptions
// {type: "object"} -> Record<string, unknown>
// {type: "object", required: ["a", "b"]} -> { a: unknown, b: unknown } & Record<string, unknown>
// {type: "object", properties: {name: {type: "string"}, age: {type: number}}} -> { name?: string, age?: number } & Record<string, unknown>
// {type: "object", required: ["name"], properties: {name: {type: "string"}, age: {type: number}}} -> { name: string, age?: number } & Record<string, unknown>

// NOTE: left here to show the incremental solution, extended later
// type FromSchemaType<J> = FromSchemaNullable<
//   J,
//   J extends { type: "array"; items: infer X }
//     ? FromSchemaTypeArray<X>
//     : J extends {
//           type: "object";
//           properties: infer X;
//           required: infer Y extends string[];
//         }
//       ? FromSchemaTypeObject<X, Y>
//       : J extends { type: "object"; properties: infer X }
//         ? FromSchemaTypeObject<X>
//         : J extends { type: "object"; required: infer Y extends string[] }
//           ? FromSchemaTypeObject<{}, Y>
//           : J extends { type: "object" }
//             ? FromSchemaTypeObject
//             : J extends { type: infer X extends string | string[] }
//               ? FromSchemaTypeName<X>
//               : never
// >;

type WithRequiredFields<O, R extends Array<string>> = [
  Exclude<keyof O, R[number]>,
  Extract<keyof O, R[number]>,
  Exclude<R[number], keyof O>,
] extends [infer X, infer Y, infer Z extends string]
  ? { [K in X & keyof O]?: O[K] } & { [K in Y & keyof O]-?: O[K] } & {
      [K in Z]: unknown;
    }
  : never;

type FromSchemaTypeObject<J = {}, R extends Array<string> = []> = MergeO<
  WithRequiredFields<
    {
      [K in keyof J]: FromSchemaType<J[K]>;
    },
    R
  > &
    Record<string, unknown>
>;

// prettier-ignore
type T03 = [
  Assert<Equals<{[x: string]: unknown}, FromSchemaType<{ type: "object" }>>>,
  Assert<Equals<{name: unknown, [x: string]: unknown}, FromSchemaType<{ type: "object", required: ["name"] }>>>,
  Assert<Equals<{name: string, [x: string]: unknown}, FromSchemaType<{ type: "object", properties: {name: {type: "string"}}, required: ["name"] }>>>,
  Assert<Equals<{name?: string | undefined, [x: string]: unknown}, FromSchemaType<{ type: "object", properties: {name: {type: "string"}} }>>>,
  Assert<Equals<{name?: string | undefined, [x: string]: unknown}, FromSchemaType<{ type: "object", properties: {name: {type: "string"}}, required: [] }>>>,
  Assert<Equals<{name: string, age?: number | undefined, [x: string]: unknown}, FromSchemaType<{ type: "object", properties: {name: {type: "string"}, age: {type: "integer"}}, required: ["name"] }>>>,
]

// Enum types & const types
type FromSchemaType<J> = FromSchemaNullable<
  J,
  J extends { type: "array"; items: infer X }
    ? FromSchemaTypeArray<X>
    : J extends {
          type: "object";
          properties: infer X;
          required: infer Y extends string[];
        }
      ? FromSchemaTypeObject<X, Y>
      : J extends { type: "object"; properties: infer X }
        ? FromSchemaTypeObject<X>
        : J extends { type: "object"; required: infer Y extends string[] }
          ? FromSchemaTypeObject<{}, Y>
          : J extends { type: "object" }
            ? FromSchemaTypeObject
            : J extends { type: infer X extends string | string[] }
              ? FromSchemaTypeName<X>
              : J extends { enum: infer X extends any[] }
                ? FromSchemaEnum<X>
                : J extends { const: infer X }
                  ? X
                  : never
>;

type FromSchemaEnum<E extends any[]> = E extends [
  infer H,
  ...infer T extends any[],
]
  ? H | FromSchemaEnum<T>
  : never;

// prettier-ignore
type T04 = [
  Assert<Equals<"red" | "amber" | "green", FromSchemaType<{ enum: ["red", "amber", "green"] }>>>,
  Assert<Equals<2 | "foo" | {foo: "bar"} | [1, 2, 3], FromSchemaType<{enum: [2, "foo", {foo: "bar" }, [1, 2, 3]]}>>>,
  Assert<Equals<"red" | "amber" | "green" | null | 42, FromSchemaType<{ enum: ["red", "amber", "green", null, 42] }>>>,
  Assert<Equals<"red", FromSchemaType<{ const: "red" }>>>,
  Assert<Equals<[1, 2, 3], FromSchemaType<{ const: [1, 2, 3] }>>>,
]

// TODO: oneOf
// TODO: anyOf
// TODO: allOf

type FromSchema<T> = FromSchemaType<T>;

const s01 = {
  $id: "https://example.com/address.schema.json",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  description: "An address similar to http://microformats.org/wiki/h-card",
  type: "object",
  properties: {
    postOfficeBox: { type: "string" },
    extendedAddress: { type: "string" },
    streetAddress: { type: "string" },
    locality: { type: "string" },
    region: { type: "string" },
    postalCode: { type: "string" },
    countryName: { type: "string" },
  },
  required: ["locality", "region", "countryName"],
  dependentRequired: {
    postOfficeBox: ["streetAddress"],
    extendedAddress: ["streetAddress"],
  },
} as const;

type S01 = FromSchema<DeepWriteable<typeof s01>>;

const s02 = {
  $id: "https://example.com/blog-post.schema.json",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  description: "A representation of a blog post",
  type: "object",
  required: ["title", "content", "author"],
  properties: {
    title: { type: "string" },
    content: { type: "string" },
    publishedDate: { type: "string", format: "date-time" },
    author: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
  },
} as const;

type S02 = FromSchema<DeepWriteable<typeof s02>>;

// const s03 = {
//   $id: "https://example.com/device.schema.json",
//   $schema: "https://json-schema.org/draft/2020-12/schema",
//   type: "object",
//   properties: { deviceType: { type: "string" } },
//   required: ["deviceType"],
//   oneOf: [
//     {
//       type: "object",
//       properties: {
//         brand: { type: "string" },
//         model: { type: "string" },
//         screenSize: { type: "number" },
//         deviceType: { const: "smartphone" },
//       },
//       required: ["brand", "model", "screenSize"],
//     },
//     {
//       type: "object",
//       properties: {
//         brand: { type: "string" },
//         model: { type: "string" },
//         processor: { type: "string" },
//         ramSize: { type: "number" },
//         deviceType: { const: "laptop" },
//       },
//       required: ["brand", "model", "processor", "ramSize"],
//     },
//   ],
// } as const;

export { T01, T02, T03, T04, S01, S02, Expand };
